import {
  CallHandler,
  ExecutionContext,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { Prisma } from '@prisma/client';
import {
  BadRequestException,
  InternalServerErrorException,
} from '../exceptions';

@Injectable()
export class ErrorsInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    return next.handle().pipe(
      catchError((err) => {
        // Prisma 에러
        if (
          err instanceof Prisma.PrismaClientInitializationError ||
          err instanceof Prisma.PrismaClientKnownRequestError ||
          err instanceof Prisma.PrismaClientRustPanicError ||
          err instanceof Prisma.PrismaClientUnknownRequestError ||
          err instanceof Prisma.PrismaClientValidationError
        ) {
          const prismaException = getPrismaException(err);
          return throwError(() => prismaException);
        }

        return throwError(() => err);
      }),
    );
  }
}

function getPrismaException(exception) {
  switch (exception.code) {
    case 'P2002':
      return new BadRequestException(
        `중복된 ${exception.meta.target[0]}값 입니다.`,
      );
    default:
      console.error(exception);
      return new InternalServerErrorException(exception.code);
  }
}
