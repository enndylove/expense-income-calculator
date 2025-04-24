import {
  Body,
  Controller,
  Get,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { Request } from 'express';
import { AuthGuard } from 'src/auth/auth.guard';
import { ProjectsService } from './projects.service';
import { CreateProjectDto } from './dto/create-project.dto';
import type { User } from 'src/drizzle/schema';

@UseGuards(AuthGuard)
@Controller('projects')
export class ProjectsController {
  constructor(private readonly projectsService: ProjectsService) { }

  @Post()
  async createProject(
    @Req() req: Request,
    @Body() dto: CreateProjectDto
  ) {
    const user = req.user as User;
    return this.projectsService.createProject(user, dto)
  }

  @Get()
  async getMyProjects(
    @Req() req: Request,
  ) {
    const user = req.user as User;
    return this.projectsService.getMyProjects(user.id)
  }
}
