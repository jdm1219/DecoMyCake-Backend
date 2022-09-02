import { HttpException, HttpStatus } from '@nestjs/common';

export class UnauthorizedException extends HttpException {
  constructor() {
    super(
      {
        status: HttpStatus.UNAUTHORIZED,
        message: '유효하지 않은 토큰입니다.',
      },
      HttpStatus.UNAUTHORIZED,
    );
  }
}
