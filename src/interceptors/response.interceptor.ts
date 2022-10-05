import { Response } from 'express';
import {
  CallHandler,
  ExecutionContext,
  HttpStatus,
  Injectable,
  NestInterceptor,
} from '@nestjs/common';
import { map, Observable } from 'rxjs';

@Injectable()
export class ResponseInterceptor implements NestInterceptor {
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const request = context.switchToHttp().getRequest<Request>();
    const response = context.switchToHttp().getResponse<Response>();
    if (request.method === 'POST') {
      response.status(HttpStatus.OK);
    }
    return next.handle().pipe(
      map((data) => ({
        message: response.statusCode < 300 ? 'OK' : 'FAIL',
        status: response.statusCode,
        data,
      })),
    );
  }
}
