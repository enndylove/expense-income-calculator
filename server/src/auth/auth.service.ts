import {
  Injectable,
  Inject,
  NotFoundException,
  UnauthorizedException,
  HttpStatus,
  BadRequestException,
  Res,
} from '@nestjs/common';
import * as sc from '../drizzle/schema';
import * as q from 'drizzle-orm';
import type { User } from './entities/user.entity';
import type { NewUser } from '../drizzle/schema';
import bcrypt from 'bcryptjs';
import { JwtService } from '@nestjs/jwt';
import { Response } from 'express';
import { DB } from 'src/drizzle/drizzle.module';
import { EncryptionService } from 'src/encryption/encryption.service';
import { SmtpService } from 'src/smtp/smtp.service';

import { subMinutes } from 'date-fns';
import { twoFATemplate } from 'src/smtp/templates/twoFA.template';

export const JWT_TOKEN_VARIABLE = 'access_token';
export const VERIFY_EMAIL_VARIABLE = 'verify_email';

@Injectable()
export class AuthService {
  saltOrRounds: number = 10;

  constructor(
    @Inject('DB') private db: DB,
    private readonly jwtService: JwtService,
    private readonly encryptionService: EncryptionService,
    private readonly smtpService: SmtpService
  ) { }


  private readonly characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';

  generateSixCharCode(): string {
    let code = '';
    for (let i = 0; i < 6; i++) {
      const randomIndex = Math.floor(Math.random() * this.characters.length);
      code += this.characters[randomIndex];
    }
    return code;
  }


  async decodeToken(token: string) {
    try {
      const decoded = await this.jwtService.verifyAsync(token);
      return decoded;
    } catch (error) {
      throw new UnauthorizedException('Invalid or expired token');
    }
  }

  async findUserByEmail(email: User['email']) {
    const user = await this.db.query.users.findFirst({
      where: q.eq(sc.users.email, email),
    });

    return user;
  }


  async validateUser(entity: User) {
    const user = await this.db.query.users.findFirst({
      columns: {
        id: true,
        email: true,
        password: true,
        image: true,
        plan: true,
      },
      where: q.eq(sc.users.email, entity.email),
    });

    if (!user) throw new NotFoundException('User not found');

    const isMatch = await bcrypt.compare(entity.password, user.password);

    if (!isMatch) {
      throw new UnauthorizedException();
    }

    return user;
  }

  async signUp(entity: User): Promise<User[]> {
    const hashPass = await bcrypt.hash(entity.password, this.saltOrRounds);
    const encryptedBalance = this.encryptionService.encrypt('0');

    return this.db
      .insert(sc.users)
      .values({
        email: entity.email,
        password: hashPass,
        balance: encryptedBalance,
      })
      .returning();
  }

  async signIn(dto: User, res: Response) {
    try {
      const user = await this.validateUser(dto);
      const code = this.generateSixCharCode();

      await this.db.insert(sc.twoFaCodes).values({
        clientId: user.id,
        code: code,
      });

      await this.smtpService.sendMail(
        [user.email],
        'Your Verification Code',
        twoFATemplate(code),
      );

      res.cookie(VERIFY_EMAIL_VARIABLE, user.email, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict',
        maxAge: 30 * 60 * 1000, // 30 min
      });
      return {
        statusCode: HttpStatus.OK,
        message: '2FA code sent to your email',
      };
    } catch (err) {
      throw new BadRequestException('SMTP error');
    }
  }


  async verify2FAcode(email: User['email'], code: string, res: Response) {
    const user = await this.findUserByEmail(email);
    if (!user) throw new Error('User not found');

    const tenMinutesAgo = subMinutes(new Date(), 10).toISOString();

    const validCode = await this.db.query.twoFaCodes.findFirst({
      where: q.and(
        q.eq(sc.twoFaCodes.clientId, user.id),
        q.eq(sc.twoFaCodes.code, code),
        q.eq(sc.twoFaCodes.isActivate, false),
        q.gt(sc.twoFaCodes.createdAt, tenMinutesAgo)
      ),
      orderBy: (twoFaCodes, { desc }) => [desc(twoFaCodes.createdAt)]
    });

    if (!validCode) {
      throw new Error('Invalid or expired 2FA code');
    }

    await this.db.update(sc.twoFaCodes).set({
      isActivate: true
    }).where(
      q.and(q.eq(sc.twoFaCodes.code, code), q.eq(sc.twoFaCodes.clientId, user.id))
    );


    return this.authentication(user, res);
  }

  async resend2FAcode(email: User['email']) {
    try {
      const user = await this.findUserByEmail(email);

      if (!user) throw new BadRequestException('User not found')

      const code = this.generateSixCharCode();

      await this.db.insert(sc.twoFaCodes).values({
        clientId: user.id,
        code: code,
      });

      await this.smtpService.sendMail(
        [email],
        'Your Verification Code',
        twoFATemplate(code),
      );

      return {
        statusCode: HttpStatus.OK,
        message: '2FA code sent to your email',
      };
    } catch (err) {
      throw new BadRequestException('SMTP error')
    }
  }


  async authentication(entity: NewUser, res: Response) {
    const payload = {
      id: entity.id,
      email: entity.email,
      image: entity.image,
      plan: entity.plan
    };

    const access_token = await this.jwtService.signAsync(payload);

    res.setHeader('Authorization', `Bearer ${access_token}`);
    res.cookie(JWT_TOKEN_VARIABLE, access_token, {
      sameSite: 'strict',
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 day
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
    });

    return { access_token };
  }


  async logout(res: Response) {
    res.clearCookie(JWT_TOKEN_VARIABLE, {
      sameSite: 'strict',
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
    });
    res.removeHeader('Authorization');

    return { message: 'Logged out successfully' };
  }

  async getAll() {
    return this.db.select().from(sc.users);
  }
}
