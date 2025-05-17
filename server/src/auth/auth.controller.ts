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
  constructor(private readonly authService: AuthService) { }

  @Post('sign-up')
  async signUp(@Body() dto: User) {
    return this.authService.signUp(dto);
  }

  @HttpCode(HttpStatus.OK)
  @Post('sign-in')
  async signIn(@Body() dto: User, @Res({ passthrough: true }) res: Response) {
    return this.authService.signIn(dto, res);
  }

  @HttpCode(HttpStatus.OK)
  @Post('enter-2fa-code')
  async enter2FA(@Req() req: Request, @Body() dto: { code: string }, @Res({ passthrough: true }) res: Response) {
    const email = req.cookies.verify_email;
    return this.authService.verify2FAcode(email, dto.code, res);
  }

  @HttpCode(HttpStatus.OK)
  @Post('resend-2fa-code')
  async resend2FA(@Req() req: Request) {
    const email = req.cookies.verify_email;
    return this.authService.resend2FAcode(email);
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

  @Get()
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
