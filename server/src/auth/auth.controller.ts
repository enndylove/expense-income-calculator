import {
  Controller,
  Post,
  Get,
  Body,
  HttpCode,
  HttpStatus,
  Res,
  Req,
  UseGuards,
  UnauthorizedException,
} from '@nestjs/common';
import { User } from './entities/user.entity';
import { AuthService } from './auth.service';
import { Request, Response } from 'express';
import { AuthGuard } from './auth.guard';
import { JWT_TOKEN_VARIABLE } from './auth.service';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('sign-up')
  async signUp(@Body() dto: User) {
    return this.authService.signUp(dto);
  }

  @HttpCode(HttpStatus.OK)
  @Get('sign-in')
  async signIn(@Body() dto: User, @Res() res: Response) {
    try {
      const result = await this.authService.signIn(dto, res);
      // If the result is not already sent, send the response here.
      if (!res.headersSent) {
        res.send(result);
      }
    } catch (error) {
      res
        .status(HttpStatus.INTERNAL_SERVER_ERROR)
        .send({ message: 'Error during sign-in' + error });
    }
  }

  @UseGuards(AuthGuard)
  @Get('logout')
  async logout(@Res() res: Response) {
    try {
      const result = await this.authService.logout(res);

      if (!res.headersSent) {
        res.send(result);
      }
    } catch (error) {
      res
        .status(HttpStatus.INTERNAL_SERVER_ERROR)
        .send({ message: 'Error during sign-in' + error });
    }
  }

  @Get('me')
  async getUserInfo(@Req() req: Request) {
    const token =
      req.cookies[JWT_TOKEN_VARIABLE] ||
      req.headers.authorization?.split(' ')[1];

    if (!token) {
      throw new UnauthorizedException('Token is required');
    }

    return this.authService.decodeToken(token);
  }
}
