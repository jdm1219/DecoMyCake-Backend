import { IsISO8601, IsNotEmpty } from 'class-validator';

export class CreatePostRequest {
  @IsNotEmpty()
  id: string;

  @IsNotEmpty()
  content: string;

  @IsNotEmpty()
  fileName: string;

  @IsISO8601()
  readingDate: string;
}
