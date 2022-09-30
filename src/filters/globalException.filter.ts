import { Response } from 'express';
import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
} from '@nestjs/common';
import { Prisma } from '@prisma/client';
import {
  BadRequestException,
  InternalServerErrorException,
} from '../exceptions';

@Catch()
export default class GlobalExceptionFilter implements ExceptionFilter {
  catch(exception: any, host: ArgumentsHost): any {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();

    if (exception instanceof Prisma.PrismaClientKnownRequestError) {
      const prismaException = getPrismaEception(exception);
      return response
        .status(prismaException.getStatus())
        .json(prismaException.getResponse());
    }

    if (exception instanceof HttpException) {
      return response
        .status(exception.getStatus())
        .json(exception.getResponse());
    }

    const e = new InternalServerErrorException();
    return response.status(e.getStatus()).json(e.getResponse());
  }
}

function getPrismaEception(exception) {
  switch (exception.code) {
    case 'P2002':
      return new BadRequestException(
        `중복된 ${exception.meta.target[0]}값 입니다.`,
      );
    default:
      return new InternalServerErrorException(exception.message);
  }
}
