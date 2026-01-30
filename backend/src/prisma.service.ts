import { Injectable, OnModuleInit } from '@nestjs/common';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit {
  async onModuleInit() {
    try {
      await this.$connect();
      console.log('✅ DATABASE CONNECTED SUCCESSFULLY');
    } catch (error) {
      console.error('❌ DATABASE CONNECTION FAILED:', error.message);
    }
  }
}
