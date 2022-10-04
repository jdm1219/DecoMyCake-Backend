import { Body, Controller, Get, HttpCode, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { SigninRequest } from './dto/signin-request';
import { SignupRequest } from './dto/signup-request';
import {
  ApiOkResponse,
  ApiOperation,
  ApiSecurity,
  ApiTags,
} from '@nestjs/swagger';
import { SwaggerController } from '../common/controller/swagger.controller';
import { SigninResponse } from './dto/signin-response';
import { OkResponse } from '../common/dto/ok-response';

@Controller('auth')
@ApiTags('유저 API')
export class AuthController extends SwaggerController {
  constructor(private readonly authService: AuthService) {
    super();
  }

  @Post('/sign-in')
  @HttpCode(200)
  @ApiOperation({ summary: '로그인', description: '로그인' })
  @ApiOkResponse({
    description: '성공',
    type: SigninResponse,
  })
  async signIn(@Body() signinRequest: SigninRequest) {
    return await this.authService.signIn(signinRequest);
  }

  @Post('/sign-up')
  @HttpCode(200)
  @ApiOperation({ summary: '회원가입', description: '회원가입' })
  @ApiOkResponse({
    description: '성공',
    type: OkResponse,
  })
  async signUp(@Body() signupRequest: SignupRequest) {
    return await this.authService.signUp(signupRequest);
  }

  @Get('/verify')
  @ApiSecurity('Authorization')
  @ApiOperation({ summary: '토큰유효성검사', description: '토큰유효성검사' })
  @ApiOkResponse({
    description: '성공',
    type: OkResponse,
  })
  async verify() {
    return await this.authService.verify();
  }
}
