import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import { DrizzleModule } from './drizzle/drizzle.module';
import { TransactionsModule } from './transactions/transactions.module';
import { AuthMiddleware } from './auth/auth.middleware';

@Module({
  imports: [
    ConfigModule.forRoot(),
    AuthModule,
    DrizzleModule,
    TransactionsModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(AuthMiddleware).forRoutes('*');
  }
}
