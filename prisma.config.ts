import 'dotenv/config'
import * as dotenv from 'dotenv'
import * as path from 'path'
import { defineConfig } from 'prisma/config'

// Load .env.local (Next.js convention) — must run before defineConfig reads env
dotenv.config({ path: path.resolve(process.cwd(), '.env.local') })

export default defineConfig({
  schema: 'prisma/schema.prisma',
  migrations: {
    path: 'prisma/migrations',
  },
  datasource: {
    // In Prisma 7, directUrl is removed. Use the direct (non-pooled) connection
    // for both runtime and migrations so migrate dev works correctly.
    url: process.env.DIRECT_DATABASE_URL ?? process.env.DATABASE_URL ?? '',
  },
})
