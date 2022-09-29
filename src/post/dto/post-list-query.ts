import { IsInt, IsNotEmpty } from 'class-validator';
import { Type } from 'class-transformer';

export class PostListQuery {
  @IsNotEmpty()
  id: string;

  @IsInt()
  @Type(() => Number)
  page: number;

  @IsInt()
  @Type(() => Number)
  size: number;
}
