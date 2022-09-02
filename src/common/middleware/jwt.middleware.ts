import { Injectable, NestMiddleware, Next, Req, Res } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { JwtService } from '@nestjs/jwt';
import {
  InternalServerErrorException,
  UnauthorizedException,
} from '../../exceptions';

@Injectable()
export class JwtMiddleware implements NestMiddleware {
  constructor(private readonly jwtService: JwtService) {}

  use(@Req() req: Request, @Res() res: Response, @Next() next: NextFunction) {
    try {
      const token = req.header('Authorization');
      if (!token) throw new Error('INVALID_TOKEN');
      this.jwtService.verify(token);
    } catch (e) {
      switch (e.message) {
        case 'INVALID_TOKEN':
        case 'TOKEN_IS_ARRAY':
        case 'NO_USER':
          throw new UnauthorizedException();

        case 'EXPIRED_TOKEN':
          throw new UnauthorizedException();

        default:
          throw new InternalServerErrorException();
      }
    }
    next();
  }
}
