import {
  Injectable,
  Inject,
  NotFoundException,
  UnauthorizedException,
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

export const JWT_TOKEN_VARIABLE = 'access_token';

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
    const user = this.db.select().from(sc.users).where(
      q.eq(sc.users.email, email)
    ).limit(1)

    return user[0]
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
    const user = await this.validateUser(dto);

    const code = this.generateSixCharCode();

    await this.db.insert(sc.twoFaCodes).values({
      clientId: user.id,
      code: code,
    });

    await this.smtpService.sendMail([user.email], 'Your 2FA Code', `Your code is: ${code}`);

    return { message: '2FA code sent to your email' };
  }

  async verify2FAcode(email: User['email'], code: string, res: Response) {
    const user = await this.findUserByEmail(email);

    if (!user) throw new Error('User not found');

    const validCode = await this.db.query.twoFaCodes.findFirst({
      where: (twoFaCodes, { and, eq }) =>
        and(eq(twoFaCodes.clientId, user.id), eq(twoFaCodes.code, code)),
    });

    if (!validCode) {
      throw new Error('Invalid or expired 2FA code');
    }

    return this.authentication(user, res);
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
      maxAge: 7 * 24 * 60 * 60 * 1000, // 7 днів
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
