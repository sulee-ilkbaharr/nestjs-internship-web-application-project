import {
  Injectable,
  NestMiddleware,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Request, Response, NextFunction } from 'express';
import { AuthService } from './auth.service'; // AuthService'i içe aktarın

@Injectable()
export class JwtAuthMiddleware implements NestMiddleware {
  constructor(
    private readonly jwtService: JwtService,
    private readonly authService: AuthService,
  ) {}

  async use(req: Request, res: Response, next: NextFunction) {
    const authHeader = req.headers.authorization;
    if (!authHeader) {
      throw new UnauthorizedException('Authorization header not found');
    }

    const [bearer, token] = authHeader.split(' ');
    if (bearer !== 'Bearer' || !token) {
      throw new UnauthorizedException('Invalid token format');
    }

    try {
      const decoded = this.jwtService.verify(token);
      const user = await this.authService.findById(decoded.id); // Kullanıcıyı veritabanından alın
      if (!user) {
        throw new UnauthorizedException('User not found');
      }
      req.user = user; // Kullanıcıyı request nesnesine ekleyin
      next();
    } catch (error) {
      throw new UnauthorizedException('Invalid token');
    }
  }
}
