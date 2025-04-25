import {
  ForbiddenException,
  Inject,
  Injectable,
} from '@nestjs/common';
import { DB } from 'src/drizzle/drizzle.module';
import { Project, projects, type User } from 'src/drizzle/schema';
import { CreateProjectDto } from './dto/create-project.dto';
import { and, eq } from 'drizzle-orm';

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

    if (businessProjects.length > 0 && body.plan === "business" && user.plan === "personal") {
      throw new ForbiddenException('You cannot create more than 1 business project, upgrade your plan to Business')
    }

    const alreadyProjects = await this.getMyProjects(user.id);

    if (alreadyProjects.length > 1 && user.plan === "personal") {
      throw new ForbiddenException('You cannot create more than 2 projects, upgrade your plan to Business')
    }

    if (alreadyProjects.length > 24 && user.plan === "business") {
      throw new ForbiddenException('You cannot create more than 25 projects')
    }

    return this.db.insert(projects).values({
      creatorId: user.id,
      plan: body.plan,
      name: body.name,
      currency: body.currency,
      businessActivity: body.businessActivity,
    })
  }
}
