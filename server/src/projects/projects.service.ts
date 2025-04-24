import {
  Inject,
  Injectable,
} from '@nestjs/common';
import { DB } from 'src/drizzle/drizzle.module';
import { projects, type User } from 'src/drizzle/schema';
import { CreateProjectDto } from './dto/create-project.dto';

@Injectable()
export class ProjectsService {
  constructor(
    @Inject('DB') private db: DB,
  ) { }

  async createProject(creatorId: User['id'], body: CreateProjectDto) {
    return this.db.insert(projects).values({
      creatorId: creatorId,
      plan: body.plan,
      name: body.name,
      currency: body.currency,
      businessActivity: body.businessActivity,
    })
  }
}
