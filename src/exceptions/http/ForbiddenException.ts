import { HttpException, HttpStatus } from '@nestjs/common';

export class ForbiddenException extends HttpException {
  constructor() {
    super(
      {
        status: HttpStatus.FORBIDDEN,
        message: '접근 권한이 없습니다.',
      },
      HttpStatus.FORBIDDEN,
    );
  }
}
