import { Injectable } from '@nestjs/common';
import { Prisma, PrismaClient } from '@prisma/client';
import { InternalServerErrorException } from '../exceptions';
import { getPagination } from '../utils/page';

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
    await this.user.create({
      data: user,
    });
  }

  // Post

  async createPost({ insertUserId, content, readingDate, fileName, userId }) {
    try {
      return await this.post.create({
        data: {
          insertUserId,
          content,
          fileName,
          userId,
          readingDate,
        },
      });
    } catch (e) {
      if (e instanceof Prisma.PrismaClientKnownRequestError) {
        switch (e.code) {
          case 'P2002':
            // TODO: CustomException 만들기
            return `중복된 ${e.meta.target[0]}값 입니다.`;
        }
      }
      throw new InternalServerErrorException();
    }
  }

  async getPostList<T>({
    userId,
    page,
    size,
    include = {},
  }): Promise<PostWithInsertUser[] | null> {
    const pagination = getPagination(page, size);
    try {
      return await this.post.findMany({
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
      });
    } catch (e) {
      console.log(e);
      throw e;
    }
  }
}
