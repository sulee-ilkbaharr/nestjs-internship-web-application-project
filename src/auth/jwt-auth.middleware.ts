import {
  Injectable,
  NestMiddleware,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Request, Response, NextFunction } from 'express';
import { AuthService } from './auth.service';

@Injectable()
export class JwtAuthMiddleware implements NestMiddleware {
  constructor(
    private readonly jwtService: JwtService,
    private readonly authService: AuthService,
  ) {}

  async use(req: Request, res: Response, next: NextFunction) {
    const authHeader = req.headers.authorization;
    if (!authHeader) {
      console.log('Authorization header not found');
      throw new UnauthorizedException('Authorization header not found');
    }

    const [bearer, token] = authHeader.split(' ');
    if (bearer !== 'Bearer' || !token) {
      console.log('Invalid token format');
      throw new UnauthorizedException('Invalid token format');
    }

    try {
      const decoded = this.jwtService.verify(token);
      const user = await this.authService.getUserByEmail(decoded.email); // Kullanıcıyı veritabanından alın
      if (!user) {
        console.log('User not found for email:', decoded.email);
        throw new UnauthorizedException('User not found');
      }
      req.user = user;
      next();
    } catch (error) {
      console.log('Invalid token', error);
      throw new UnauthorizedException('Invalid token');
    }
  }
}
