import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class OkResponse {
  @ApiProperty({
    example: 'ok',
    description: 'data',
    required: true,
  })
  @IsString()
  data: string;
}
