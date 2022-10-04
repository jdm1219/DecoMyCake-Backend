import {
  Body,
  Controller,
  Get,
  HttpCode,
  Post,
  Query,
  Req,
} from '@nestjs/common';
import { PostService } from './post.service';
import { CreatePostRequest } from './dto/create-post-request';
import { PostListQuery } from './dto/post-list-query';
import { Request } from 'express';
import {
  ApiOkResponse,
  ApiOperation,
  ApiSecurity,
  ApiTags,
} from '@nestjs/swagger';
import { SwaggerController } from '../common/controller/swagger.controller';
import { OkResponse } from '../common/dto/ok-response';
import { PostListResponse } from './dto/post-list-response';

@Controller('post')
@ApiTags('게시글 API')
export class PostController extends SwaggerController {
  constructor(private readonly postService: PostService) {
    super();
  }

  @Post('')
  @HttpCode(200)
  @ApiSecurity('Authorization')
  @ApiOperation({ summary: '게시글 등록', description: '게시글 등록' })
  @ApiOkResponse({
    description: '성공',
    type: OkResponse,
  })
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
  @ApiOkResponse({
    description: '성공',
    type: [PostListResponse],
  })
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
