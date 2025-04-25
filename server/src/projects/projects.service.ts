import {
  ForbiddenException,
  Inject,
  Injectable,
} from '@nestjs/common';
import { DB } from 'src/drizzle/drizzle.module';
import { type Project, projects, type User } from 'src/drizzle/schema';
import { CreateProjectDto } from './dto/create-project.dto';
import { and, eq } from 'drizzle-orm';
import { EditProjectDto } from './dto/edit-project.dto';

const MAX_PERSONAL_PROJECTS = 2;
const MAX_BUSINESS_PROJECTS = 25;
const MAX_BUSINESS_PROJECTS_FOR_PERSONAL_PLAN = 1;

@Injectable()
export class ProjectsService {
  constructor(
    @Inject('DB') private db: DB,
  ) { }

  async getMyProjects(userId: User['id']): Promise<Project[]> {
    return this.db.select().from(projects).where(
      eq(projects.creatorId, userId)
    )
  }

  async getMyBussinesProjects(userId: User['id']): Promise<Project[]> {
    return this.db.select().from(projects).where(
      and(
        eq(projects.creatorId, userId),
        eq(projects.plan, "business")
      )
    )
  }

  async createProject(user: Pick<User, 'id' | 'email' | 'image' | 'plan'>, body: CreateProjectDto) {
    const businessProjects = await this.getMyBussinesProjects(user.id);
    const allProjects = await this.getMyProjects(user.id);

    if (body.plan === "business" && user.plan === "personal" && businessProjects.length >= MAX_BUSINESS_PROJECTS_FOR_PERSONAL_PLAN) {
      throw new ForbiddenException('You cannot create more than 1 business project, upgrade your plan to Business');
    }

    if (user.plan === "personal" && allProjects.length >= MAX_PERSONAL_PROJECTS) {
      throw new ForbiddenException('You cannot create more than 2 projects, upgrade your plan to Business');
    }

    if (user.plan === "business" && allProjects.length >= MAX_BUSINESS_PROJECTS) {
      throw new ForbiddenException('You cannot create more than 25 projects');
    }

    return this.db.insert(projects).values({
      creatorId: user.id,
      plan: body.plan,
      name: body.name,
      currency: body.currency,
      businessActivity: body.businessActivity,
    });
  }

  async editProject(projectId: Project['id'], reqUserId: User['id'], body: EditProjectDto) {
    return this.db.update(projects)
      .set({
        name: body.name,
        businessActivity: body.businessActivity
      })
      .where(and(
        eq(projects.creatorId, reqUserId),
        eq(projects.id, projectId)
      ));
  }


  async deleteProject(projectId: Project['id'], reqUserId: User['id']) {
    return this.db.delete(projects)
      .where(and(
        eq(projects.creatorId, reqUserId),
        eq(projects.id, projectId)
      ));
  }
}
