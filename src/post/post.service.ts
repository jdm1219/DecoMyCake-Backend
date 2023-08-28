import { Injectable } from '@nestjs/common';
import { UserService } from '../user/user.service';
import * as dayjs from 'dayjs';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class PostService {
  constructor(
    private readonly userService: UserService,
    private readonly prismaService: PrismaService,
  ) {}

  async createPost(insertUserId, postRequest) {
    const { readingDate, id } = postRequest;
    const { uid: userId } = await this.userService.findById(id);

    await this.prismaService.createPost({
      ...postRequest,
      insertUserId,
      userId,
      readingDate: dayjs(readingDate).toDate(),
    });
    return null;
  }

  async getPostList({ id, page, size }) {
    const { uid: userId, nickname } = await this.userService.findById(id);

    const { posts, total } = await this.prismaService.getPostList({
      userId,
      page,
      size,
    });

    return {
      content: posts.map(({ id, fileName, insertDt }) => ({
        id,
        fileName,
        insertDt,
      })),
      total,
      nickname,
    };
  }

  async getOwnPostList({ id, page, size }) {
    const { uid: userId, nickname } = await this.userService.findById(id);

    const { posts, total } = await this.prismaService.getPostList({
      userId,
      page,
      size,
    });
    return {
      content: posts.map(
        ({ id, content, readingDate, fileName, insertDt, insertUser }) => {
          const isUnlock = dayjs().isBefore(dayjs(readingDate));
          return {
            id,
            content: isUnlock ? undefined : content,
            fileName,
            insertDt,
            lockYn: isUnlock ? 'Y' : 'N',
            nickname: insertUser.nickname,
            readingDate,
          };
        },
      ),
      total,
      nickname,
    };
  }
}
