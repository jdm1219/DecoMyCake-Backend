import { Injectable } from '@nestjs/common';
import { Prisma, PrismaClient } from '@prisma/client';
import { InternalServerErrorException } from '../exceptions';
import { getPagination } from '../utils/page';
import { hashPassword } from '../utils/user';

type PostWithInsertUser = Prisma.PostGetPayload<{
  include: {
    insertUser: {
      select: {
        nickname: true;
      };
    };
  };
}>;

@Injectable()
export class PrismaService extends PrismaClient {
  // User

  async findById(id) {
    return await this.user.findUnique({
      where: {
        id,
      },
    });
  }

  async signUp(user) {
    const hashedPassword = await hashPassword(user.password);

    await this.user.create({
      data: {
        ...user,
        password: hashedPassword,
      },
    });
  }

  // Post

  async createPost({ insertUserId, content, readingDate, fileName, userId }) {
    return await this.post.create({
      data: {
        insertUserId,
        content,
        fileName,
        userId,
        readingDate,
      },
    });
  }

  async getPostList({ userId, page, size, include = {} }): Promise<{
    posts: PostWithInsertUser[] | null;
    total: number;
  }> {
    const pagination = getPagination(page, size);
    const [posts, total] = await this.$transaction([
      this.post.findMany({
        where: {
          userId,
        },
        include: {
          insertUser: {
            select: {
              nickname: true,
            },
          },
          ...include,
        },
        orderBy: {
          insertDt: 'desc',
        },
        ...pagination,
      }),
      this.post.count({
        where: {
          userId,
        },
      }),
    ]);

    return {
      posts,
      total,
    };
  }
}
