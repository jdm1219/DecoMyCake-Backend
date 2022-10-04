import { IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class SignupRequest {
  @ApiProperty()
  @IsNotEmpty()
  id: string;

  @ApiProperty()
  @IsNotEmpty()
  password: string;

  @ApiProperty()
  @IsNotEmpty()
  nickname: string;
}
