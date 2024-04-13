import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response } from 'express';

@Injectable()
export class AuthMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: () => void) {
    const { authorization } = req.headers;
    if( !authorization ) {
      return res.status(401).json({
        message: 'Unauthorized'
      });
    }

    if( authorization !== '123456' ) {
      return res.status(401).json({
        message: 'Unauthorized'
      });
    }

    next();
  }
}
