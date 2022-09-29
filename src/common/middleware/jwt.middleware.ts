import { Injectable, NestMiddleware, Next, Req, Res } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import { JwtService } from '@nestjs/jwt';
import {
  InternalServerErrorException,
  UnauthorizedException,
} from '../../exceptions';
import { UserService } from '../../user/user.service';

@Injectable()
export class JwtMiddleware implements NestMiddleware {
  constructor(
    private readonly jwtService: JwtService,
    private readonly userService: UserService,
  ) {}

  async use(
    @Req() req: Request,
    @Res() res: Response,
    @Next() next: NextFunction,
  ) {
    try {
      const token = req.header('Authorization');
      if (!token) throw new Error('INVALID_TOKEN');
      const { id } = this.jwtService.verify(token);
      req.user = await this.userService.findById(id);
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
