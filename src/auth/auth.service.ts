import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { SigninRequest } from './dto/signin-request';
import { PrismaClient, Prisma } from '@prisma/client';
import { SignupRequest } from './dto/signup-request';
import { InternalServerErrorException } from '../exceptions';

const prisma = new PrismaClient();

@Injectable()
export class AuthService {
  constructor(private jwtService: JwtService) {}

  async signIn(signinRequest: SigninRequest) {
    const where: Prisma.UserWhereUniqueInput = {
      id: signinRequest.id,
    };
    const user = await prisma.user.findUnique({
      where,
    });

    return {
      access_token: this.jwtService.sign(user),
    };
  }

  async signUp(signupRequest: SignupRequest) {
    const user: Prisma.UserCreateInput = { ...signupRequest };
    try {
      await prisma.user.create({
        data: user,
      });
    } catch (e) {
      if (e instanceof Prisma.PrismaClientKnownRequestError) {
        switch (e.code) {
          case 'P2002':
            // TODO: CustomException 만들기
            return `중복된 ${e.meta.target[0]}값 입니다.`;
        }
      }
      throw new InternalServerErrorException();
    }
    return 'ok';
  }
}
