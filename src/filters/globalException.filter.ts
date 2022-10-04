import { Response } from 'express';
import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
} from '@nestjs/common';
import { InternalServerErrorException, NotFoundException } from '../exceptions';

@Catch()
export default class GlobalExceptionFilter implements ExceptionFilter {
  catch(exception: any, host: ArgumentsHost): any {
    const response = host.switchToHttp().getResponse<Response>();

    if (exception instanceof HttpException) {
      switch (exception.getStatus()) {
        case 404:
          const notFoundException = new NotFoundException();
          return response
            .status(notFoundException.getStatus())
            .json(notFoundException.getResponse());
        default:
          return response
            .status(exception.getStatus())
            .json(exception.getResponse());
      }
    }

    const e = new InternalServerErrorException();
    return response.status(e.getStatus()).json(e.getResponse());
  }
}
