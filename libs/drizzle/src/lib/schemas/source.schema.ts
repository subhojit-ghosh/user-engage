import {
  boolean,
  char,
  pgEnum,
  pgTable,
  timestamp,
  varchar,
} from 'drizzle-orm/pg-core';
import { brandsTable } from './brand.schema';

export const sourcePlatformEnum = pgEnum('source_platform', [
  'web',
  'android',
  'ios',
]);

export const sourcesTable = pgTable('sources', {
  id: char({ length: 26 }).primaryKey(),
  brandId: char({ length: 26 })
    .references(() => brandsTable.id)
    .notNull(),
  name: varchar({ length: 255 }).notNull(),
  platform: sourcePlatformEnum().notNull(),
  domain: varchar({ length: 255 }),
  apiKey: char({ length: 255 }).unique().notNull(),
  isActive: boolean().default(true),
  createdAt: timestamp({ withTimezone: true }).defaultNow(),
  updatedAt: timestamp({ withTimezone: true }),
});
