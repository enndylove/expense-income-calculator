import {
  Injectable,
  Inject,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { NodePgDatabase } from 'drizzle-orm/node-postgres';
import * as sc from '../drizzle/schema';
import * as q from 'drizzle-orm';
import type { User } from './entities/user.entity';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { Response } from 'express';
import { DB } from 'src/drizzle/drizzle.module';

export const JWT_TOKEN_VARIABLE = 'access_token';

@Injectable()
export class AuthService {
  saltOrRounds: number = 10;

  constructor(
    @Inject('DB') private db: DB,
    private readonly jwtService: JwtService,
  ) {}

  async decodeToken(token: string) {
    try {
      const decoded = await this.jwtService.verifyAsync(token);
      return decoded;
    } catch (error) {
      throw new UnauthorizedException('Invalid or expired token');
    }
  }

  async validateUser(entity: User) {
    const user = await this.db.query.users.findFirst({
      columns: {
        id: true,
        email: true,
        password: true,
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

    return this.db
      .insert(sc.users)
      .values({
        email: entity.email,
        password: hashPass,
      })
      .returning();
  }

  async signIn(entity: User, res: Response) {
    const user = await this.validateUser(entity);

    const payload = { id: user.id, email: user.email };
    const access_token = await this.jwtService.signAsync(payload);

    res.header('Authorization', `Bearer ${access_token}`);
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
