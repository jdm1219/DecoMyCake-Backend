import { HttpException, HttpStatus } from '@nestjs/common';

export class ForbiddenException extends HttpException {
  constructor(message = '접근 권한이 없습니다.') {
    super(
      {
        status: HttpStatus.FORBIDDEN,
        message,
      },
      HttpStatus.FORBIDDEN,
    );
  }
}
