import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { drizzle, NodePgDatabase } from 'drizzle-orm/node-postgres';
import * as schema from './schemas';

export const DRIZZLE = Symbol('drizzle-connection');
export type DrizzleDB = NodePgDatabase<typeof schema>;
export * from './schemas';

@Module({
  imports: [ConfigModule],
  providers: [
    {
      provide: DRIZZLE,
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => {
        const databaseUrl = configService.get<string>(
          'POSTGRESQL_DATABASE_URL'
        ) as string;

        return drizzle(databaseUrl, {
          schema,
          casing: 'snake_case',
        });
      },
    },
  ],
  exports: [DRIZZLE],
})
export class DrizzleModule {}
