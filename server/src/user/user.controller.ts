import { Controller, Get, Req, UseGuards } from '@nestjs/common';
import { Request } from 'express';
import { AuthGuard } from 'src/auth/auth.guard';
import { User } from 'src/drizzle/schema';
import { UserService } from './user.service';

@UseGuards(AuthGuard)
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get('balance')
  async getUserBalance(@Req() req: Request) {
    const user = req.user as User;

    return this.userService.getUserBalance(user.id, user.email);
  }
}
