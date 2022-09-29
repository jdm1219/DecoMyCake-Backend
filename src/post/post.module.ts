import { Module } from '@nestjs/common';
import { PostController } from './post.controller';
import { PostService } from './post.service';
import { UserService } from '../user/user.service';

@Module({
  controllers: [PostController],
  providers: [PostService, UserService],
})
export class PostModule {}
