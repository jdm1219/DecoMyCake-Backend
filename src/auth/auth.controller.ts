import { Body, Controller, Get, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { SigninRequest } from './dto/signin-request';
import { SignupRequest } from './dto/signup-request';
import { ApiOperation, ApiSecurity, ApiTags } from '@nestjs/swagger';
import { SwaggerController } from '../common/controller/swagger.controller';
import { SigninResponse } from './dto/signin-response';
import { CustomApiOkResponse } from '../common/successCustomResponse';
import { CommonApiOkResponse } from '../common/successCommonResponse';

@Controller('auth')
@ApiTags('유저 API')
export class AuthController extends SwaggerController {
  constructor(private readonly authService: AuthService) {
    super();
  }

  @Post('/sign-in')
  @ApiOperation({ summary: '로그인', description: '로그인' })
  @CustomApiOkResponse(SigninResponse)
  async signIn(@Body() signinRequest: SigninRequest) {
    return await this.authService.signIn(signinRequest);
  }

  @Post('/sign-up')
  @ApiOperation({ summary: '회원가입', description: '회원가입' })
  async signUp(@Body() signupRequest: SignupRequest) {
    return await this.authService.signUp(signupRequest);
  }

  @Get('/verify')
  @ApiSecurity('Authorization')
  @ApiOperation({ summary: '토큰유효성검사', description: '토큰유효성검사' })
  @CommonApiOkResponse()
  async verify() {
    return await this.authService.verify();
  }
}
