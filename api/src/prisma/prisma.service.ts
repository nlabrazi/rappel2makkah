import {Injectable, OnModuleInit, OnModuleDestroy} from '@nestjs/common';
import {PrismaClient} from '@prisma/client';

@Injectable()
export class PrismaService
  extends PrismaClient
  implements OnModuleInit, OnModuleDestroy
{
  constructor() {
    super({
      datasources: {
        db: {
          url: process.env.DATABASE_URL,
        },
      },
    });
  }

  async onModuleInit(): Promise<void> {
    try {
      await (this as PrismaClient).$connect();
    } catch (error) {
      console.error('Failed to connect to the database', error);
    }
  }

  async onModuleDestroy(): Promise<void> {
    try {
      await (this as PrismaClient).$disconnect();
    } catch (error) {
      console.error('Failed to disconnect from the database', error);
    }
  }
}
