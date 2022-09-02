import { HttpException, HttpStatus } from '@nestjs/common';

export class NotFoundException extends HttpException {
  constructor() {
    super(
      {
        status: HttpStatus.NOT_FOUND,
        message: '리소스를 찾을 수 없습니다.',
      },
      HttpStatus.NOT_FOUND,
    );
  }
}
