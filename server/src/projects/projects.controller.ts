import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { Request } from 'express';
import { AuthGuard } from 'src/auth/auth.guard';
import { ProjectsService } from './projects.service';
import { CreateProjectDto } from './dto/create-project.dto';
import type { Project, User } from 'src/drizzle/schema';
import { EditProjectDto } from './dto/edit-project.dto';

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


  @Patch(':id')
  async editProject(
    @Req() req: Request,
    @Param('id') projectId: Project['id'],
    @Body() dto: EditProjectDto,
  ) {
    const user = req.user as User;
    return this.projectsService.editProject(projectId, user.id, dto)
  }

  @Delete(':id')
  async deleteProject(
    @Req() req: Request,
    @Param('id') projectId: Project['id'],
  ) {
    const user = req.user as User;
    return this.projectsService.deleteProject(projectId, user.id)
  }
}
