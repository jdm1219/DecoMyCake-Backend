import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { SigninRequest } from './dto/signin-request';
import { SignupRequest } from './dto/signup-request';
import { UserService } from '../user/user.service';
import { PrismaService } from '../prisma/prisma.service';
import { validatePassword } from '../utils/user';
import { UnauthorizedException } from '../exceptions';

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly userService: UserService,
    private readonly prismaService: PrismaService,
  ) {}

  async signIn(signinRequest: SigninRequest) {
    const user = await this.userService.findById(signinRequest.id);
    if (!(await validatePassword(signinRequest.password, user.password))) {
      throw new UnauthorizedException(
        '아이디또는 비밀번호를 잘못 입력했습니다.',
      );
    }

    return {
      accessToken: this.jwtService.sign(user),
    };
  }

  async signUp(signupRequest: SignupRequest) {
    await this.prismaService.signUp(signupRequest);
    return 'ok';
  }

  async verify() {
    return 'ok';
  }
}
