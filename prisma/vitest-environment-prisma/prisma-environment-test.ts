import 'dotenv/config'
import { randomUUID } from 'node:crypto'
import type { Environment } from 'vitest'
import { execSync } from 'node:child_process'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

function generateDataBaseUrl(schema: string) {
  if (!process.env.DATABASE_URL) {
    throw new Error('Please use a true db url!')
  }

  const url = new URL(process.env.DATABASE_URL)

  url.searchParams.set('schema', schema)

  return url.href.toString()
}

export default <Environment>{
  name: 'prisma',
  transformMode: 'ssr',
  async setup() {
    const schema = randomUUID()
    const dataBaseUrl = generateDataBaseUrl(schema)

    process.env.DATABASE_URL = dataBaseUrl

    execSync('npx prisma migrate deploy')

    return {
      async teardown() {
        await prisma.$executeRawUnsafe(`
          DROP SCHEMA IF EXISTS "${schema}" CASCADE
        `)

        await prisma.$disconnect()
      }
    }
  }
}