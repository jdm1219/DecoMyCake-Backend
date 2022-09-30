import { Global, Module } from '@nestjs/common';
import { GlobalService } from './global.service';
import { PrismaService } from '../prisma/prisma.service';

@Global()
@Module({
  providers: [GlobalService, PrismaService],
  exports: [PrismaService],
})
export class GlobalModule {}
