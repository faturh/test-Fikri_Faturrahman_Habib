import { PrismaClient } from '@prisma/client';
import 'dotenv/config';

async function test() {
  const prisma = new (PrismaClient as any)({
    datasource: {
      url: process.env.DATABASE_URL
    }
  });

  try {
    await prisma.$connect();
    console.log('✅ Connected!');
  } catch (err) {
    console.log('❌ Failed:', err.message);
  } finally {
    await prisma.$disconnect();
  }
}
test();
