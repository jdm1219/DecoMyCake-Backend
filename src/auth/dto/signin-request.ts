import { IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class SigninRequest {
  @ApiProperty()
  @IsNotEmpty()
  id: string;

  @ApiProperty()
  @IsNotEmpty()
  password: string;
}
