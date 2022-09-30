import { HttpException, HttpStatus } from '@nestjs/common';

export class BadRequestException extends HttpException {
  constructor(message = '잘못된 요청입니다.') {
    super(
      {
        status: HttpStatus.BAD_REQUEST,
        message,
      },
      HttpStatus.BAD_REQUEST,
    );
  }
}
