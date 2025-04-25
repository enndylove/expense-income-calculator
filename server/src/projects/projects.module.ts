import { Module } from '@nestjs/common';
import { ProjectsService } from './projects.service';
import { ProjectsController } from './projects.controller';
import { AuthModule } from 'src/auth/auth.module';
import { ConfigService } from '@nestjs/config';

@Module({
  imports: [AuthModule],
  providers: [ProjectsService, ConfigService],
  controllers: [ProjectsController],
  exports: [ProjectsService],
})
export class ProjectsModule { }
