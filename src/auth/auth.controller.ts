import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { SigninRequest } from './dto/signin-request';
import { SignupRequest } from './dto/signup-request';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('/sign-in')
  async signIn(@Body() signinRequest: SigninRequest) {
    return await this.authService.signIn(signinRequest);
  }

  @Post('/sign-up')
  async signUp(@Body() signupRequest: SignupRequest) {
    return await this.authService.signUp(signupRequest);
  }
}
