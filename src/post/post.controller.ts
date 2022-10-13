import { Body, Controller, Get, Post, Query, Req } from '@nestjs/common';
import { PostService } from './post.service';
import { CreatePostRequest } from './dto/create-post-request';
import { PostListQuery } from './dto/post-list-query';
import { Request } from 'express';
import { ApiOperation, ApiSecurity, ApiTags } from '@nestjs/swagger';
import { SwaggerController } from '../common/controller/swagger.controller';
import { PostListResponse } from './dto/post-list-response';
import { CustomApiOkResponse } from '../common/successCustomResponse';

@Controller('post')
@ApiTags('게시글 API')
export class PostController extends SwaggerController {
  constructor(private readonly postService: PostService) {
    super();
  }

  @Post('')
  @ApiSecurity('Authorization')
  @ApiOperation({ summary: '게시글 등록', description: '게시글 등록' })
  async createPost(
    @Req() req: Request,
    @Body() postRequest: CreatePostRequest,
  ) {
    return await this.postService.createPost(req.user['uid'], postRequest);
  }

  @Get('')
  @ApiSecurity('Authorization')
  @ApiOperation({
    summary: '게시글 리스트 조회',
    description: '게시글 리스트 조회',
  })
  @CustomApiOkResponse(PostListResponse)
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
