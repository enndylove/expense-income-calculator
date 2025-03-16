import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import { DrizzleModule } from './drizzle/drizzle.module';

@Module({
  imports: [ConfigModule.forRoot(), AuthModule, DrizzleModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
