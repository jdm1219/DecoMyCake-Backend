import { IsNotEmpty } from 'class-validator';

export class SigninRequest {
  @IsNotEmpty()
  id: string;

  @IsNotEmpty()
  password: string;
}
