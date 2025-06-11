import {
  boolean,
  char,
  pgTable,
  timestamp,
  varchar,
} from 'drizzle-orm/pg-core';
import { tenantsTable } from './tenant.schema';

export const brandsTable = pgTable('brands', {
  id: char({ length: 26 }).primaryKey(),
  tenantId: char({ length: 26 })
    .references(() => tenantsTable.id)
    .notNull(),
  name: varchar({ length: 255 }).notNull(),
  isActive: boolean().default(true),
  createdAt: timestamp({ withTimezone: true }).defaultNow(),
  updatedAt: timestamp({ withTimezone: true }),
});
