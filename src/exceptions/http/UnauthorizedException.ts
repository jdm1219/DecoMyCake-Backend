import { HttpException, HttpStatus } from '@nestjs/common';

export class UnauthorizedException extends HttpException {
  constructor(message = '유효하지 않은 토큰입니다.') {
    super(
      {
        status: HttpStatus.UNAUTHORIZED,
        message,
      },
      HttpStatus.UNAUTHORIZED,
    );
  }
}
