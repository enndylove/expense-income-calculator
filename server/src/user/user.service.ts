import { Inject, Injectable } from '@nestjs/common';
import { and, eq } from 'drizzle-orm';
import { DB } from 'src/drizzle/drizzle.module';
import { type User, users } from 'src/drizzle/schema';

@Injectable()
export class UserService {
  constructor(@Inject('DB') private db: DB) {}

  async getUserBalance(reqId: User['id'], reqEmail: User['email']) {
    const hashingBalance = this.db.query.users.findFirst({
      where: and(eq(users.id, reqId), eq(users.email, reqEmail)),
    });
  }
}
