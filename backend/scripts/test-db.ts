import { PrismaClient } from '@prisma/client';
import 'dotenv/config';

async function test() {
  console.log('Testing connection with URL:', process.env.DATABASE_URL);
  const prisma = new PrismaClient({
    datasources: {
      db: {
        url: process.env.DATABASE_URL,
      },
    },
  } as any);

  try {
    await prisma.$connect();
    console.log('✅ Connected successfully');
    const menus = await prisma.menu.findMany();
    console.log('Menus found:', menus.length);
  } catch (err) {
    console.error('❌ Connection failed:', err);
  } finally {
    await prisma.$disconnect();
  }
}

test();
