import { IsNotEmpty } from 'class-validator';

export class SignupRequest {
  @IsNotEmpty()
  id: string;

  @IsNotEmpty()
  password: string;

  @IsNotEmpty()
  nickname: string;
}
