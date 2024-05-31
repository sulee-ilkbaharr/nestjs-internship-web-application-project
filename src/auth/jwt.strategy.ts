import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { UserRepository } from './users.repository';
import { JwtPayload } from 'jsonwebtoken';
import { User } from './user.entity';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly usersRepository: UserRepository) {
    super({
      secretOrKey: 'topSecret51',
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
    });
  }

  async validate(payload: JwtPayload) {
    const { email, role } = payload;
    const user: User = await this.usersRepository.findOne({
      where: { email, role },
    });

    if (!user) {
      console.log('User not found with email and role:', email, role);
      throw new UnauthorizedException();
    }
    return user;
  }
}
