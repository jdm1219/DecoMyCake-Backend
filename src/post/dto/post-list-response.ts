import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class PostListResponse {
  @ApiProperty({
    example: 'ok',
    description: 'id',
    required: true,
  })
  @IsString()
  id: string;

  @ApiProperty({
    example: '내용',
    description: 'content',
    required: true,
  })
  @IsString()
  content: string;

  @ApiProperty({
    example: 'deco01.png',
    description: 'fileName',
    required: true,
  })
  @IsString()
  fileName: string;

  @ApiProperty({
    example: 'YYYY-MM-DD',
    description: 'insertDt',
    required: false,
  })
  @IsString()
  insertDt: string;

  @ApiProperty({
    example: 'Y | N',
    description: 'lockYn',
    required: false,
  })
  @IsString()
  lockYn?: 'Y' | 'N';

  @ApiProperty({
    example: '닉네임',
    description: 'nickname',
    required: false,
  })
  @IsString()
  nickname?: string;
}
