import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class SigninResponse {
  @ApiProperty({
    example: 'J.W.T',
    description: 'accessToken',
    required: true,
  })
  @IsString()
  accessToken: string;
}
