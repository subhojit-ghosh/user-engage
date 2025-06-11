import {
  boolean,
  char,
  pgTable,
  timestamp,
  varchar,
} from 'drizzle-orm/pg-core';

export const tenantsTable = pgTable('tenants', {
  id: char({ length: 26 }).primaryKey(),
  name: varchar({ length: 255 }).notNull(),
  isActive: boolean().default(true),
  createdAt: timestamp({ withTimezone: true }).defaultNow(),
  updatedAt: timestamp({ withTimezone: true }),
});
