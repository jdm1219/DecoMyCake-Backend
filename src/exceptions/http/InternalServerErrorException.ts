import { HttpException, HttpStatus } from '@nestjs/common';

export class InternalServerErrorException extends HttpException {
  constructor(message = '서버 오류입니다.') {
    super(
      {
        status: HttpStatus.INTERNAL_SERVER_ERROR,
        message,
      },
      HttpStatus.INTERNAL_SERVER_ERROR,
    );
  }
}
