import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { drizzle } from 'drizzle-orm/node-postgres';
import { Pool } from 'pg';
import * as schema from './schema';

@Module({
  imports: [ConfigModule],
  providers: [
    {
      provide: 'DATABASE_POOL',
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => {
        const pool = new Pool({
          host: configService.get('DB_HOST', 'localhost'),
          port: configService.get('DB_PORT', 5432),
          user: configService.get('DB_USER', 'postgres'),
          password: configService.get('DB_PASSWORD', 'postgres'),
          database: configService.get('DB_NAME', 'myapp'),
        });
        return pool;
      },
    },
    {
      provide: 'DRIZZLE_ORM',
      inject: ['DATABASE_POOL'],
      useFactory: async (pool: Pool) => {
        return drizzle(pool, { schema });
      },
    },
  ],
  exports: ['DRIZZLE_ORM'],
})
export class DatabaseModule {}
