import { PrismaClient } from '@prisma/client';

async function test() {
  const prisma = new (PrismaClient as any)({
    datasourceUrl: "postgresql://neondb_owner:npg_lJNVme2Y8CGu@ep-steep-surf-a10gnb7w-pooler.ap-southeast-1.aws.neon.tech/neondb?sslmode=require"
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
