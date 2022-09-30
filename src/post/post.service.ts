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
      userId,
      readingDate: dayjs(readingDate).toDate(),
    });
    return 'ok';
  }

  async getPostList({ id, page, size }) {
    const { uid: userId } = await this.userService.findById(id);

    return await this.prismaService.getPostList({
      userId,
      page,
      size,
    });
  }

  async getOwnPostList({ id, page, size }) {
    const { uid: userId } = await this.userService.findById(id);

    return (
      await this.prismaService.getPostList({
        userId,
        page,
        size,
      })
    ).map(({ id, content, readingDate, fileName, insertDt, insertUser }) => ({
      id,
      content,
      fileName,
      insertDt,
      lockYn: dayjs().isBefore(dayjs(readingDate)) ? 'Y' : 'N',
      nickname: insertUser.nickname,
    }));
  }
}
