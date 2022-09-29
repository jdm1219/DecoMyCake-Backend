import { Injectable } from '@nestjs/common';
import { Prisma, PrismaClient } from '@prisma/client';
import { InternalServerErrorException } from '../exceptions';
import { UserService } from '../user/user.service';
import * as dayjs from 'dayjs';

const prisma = new PrismaClient();

@Injectable()
export class PostService {
  constructor(private readonly userService: UserService) {}

  async createPost(insertUserId, postRequest) {
    try {
      const { content, readingDate, fileName, id } = postRequest;
      const { uid: userId } = await this.userService.findById(id);

      await prisma.post.create({
        data: {
          content,
          readingDate: dayjs(readingDate).toDate(),
          fileName,
          insertUserId,
          userId,
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
    return 'ok';
  }

  async getPostList({ id, page, size }) {
    const { uid: userId } = await this.userService.findById(id);
    const result = await prisma.post.findMany({
      where: {
        userId,
      },
      // select: {
      //   id: true,
      //   fileName: true,
      //   insertDt: true,
      // },
    });
    console.log(result);
    return 'getPost';
  }

  async getOwnPostList({ id, page, size }) {
    const { uid: userId } = await this.userService.findById(id);
    const result = await prisma.post.findMany({
      where: {
        userId,
      },
    });
    console.log(result);
    return 'getOwnPost';
  }
}
