import { Body, Controller, Get, Post, Query, Req } from '@nestjs/common';
import { PostService } from './post.service';
import { CreatePostRequest } from './dto/create-post-request';
import { PostListQuery } from './dto/post-list-query';
import { Request } from 'express';

@Controller('post')
export class PostController {
  constructor(private readonly postService: PostService) {}

  @Post('')
  async createPost(
    @Req() req: Request,
    @Body() postRequest: CreatePostRequest,
  ) {
    return await this.postService.createPost(req.user['uid'], postRequest);
  }

  @Get('')
  async getPostList(
    @Req() req: Request,
    @Query() postListQuery: PostListQuery,
  ) {
    if (req.user['id'] === postListQuery.id) {
      return await this.postService.getOwnPostList(postListQuery);
    }
    return await this.postService.getPostList(postListQuery);
  }
}
