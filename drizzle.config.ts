import 'dotenv/config';
import { defineConfig } from 'drizzle-kit';

export default defineConfig({
  dialect: 'postgresql',
  out: './drizzle',
  schema: './libs/drizzle/src/lib/schemas',
  casing: 'snake_case',
  dbCredentials: {
    url: process.env.POSTGRESQL_DATABASE_URL as string,
  },
});
