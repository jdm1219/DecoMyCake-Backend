import { HttpException, HttpStatus } from '@nestjs/common';

export class InternalServerErrorException extends HttpException {
  constructor() {
    super(
      {
        status: HttpStatus.INTERNAL_SERVER_ERROR,
        message: '서버 오류입니다.',
      },
      HttpStatus.INTERNAL_SERVER_ERROR,
    );
  }
}
