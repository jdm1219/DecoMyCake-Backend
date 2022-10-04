import { IsInt, IsNotEmpty } from 'class-validator';
import { Type } from 'class-transformer';
import { ApiProperty } from '@nestjs/swagger';

export class PostListQuery {
  @ApiProperty()
  @IsNotEmpty()
  id: string;

  @ApiProperty()
  @IsInt()
  @Type(() => Number)
  page: number;

  @ApiProperty()
  @IsInt()
  @Type(() => Number)
  size: number;
}
