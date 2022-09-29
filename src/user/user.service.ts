import { Injectable } from '@nestjs/common';
import { Prisma, PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

@Injectable()
export class UserService {
  async findById(id) {
    const where: Prisma.UserWhereUniqueInput = {
      id,
    };
    return await prisma.user.findUnique({
      where,
    });
  }
}
