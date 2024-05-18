import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UserRepository } from './users.repository';
import { AuthCreadentialsDto } from './dto/auth-credentials.dto';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { JwtPayload } from './jwt-payload.interface';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersRepository: UserRepository,
    private jwtService: JwtService,
  ) {}

  async signUp(authCredentialsDto: AuthCreadentialsDto): Promise<void> {
    return this.usersRepository.createUser(authCredentialsDto);
  }

  async signIn(
    authCredentialDto: AuthCreadentialsDto,
  ): Promise<{ accessToken: string }> {
    const { email, password } = authCredentialDto;
    const user = await this.usersRepository.findOne({ where: { email } });

    // findOne({
    //   where: [{ email: user.email }],
    // });

    if (user && (await bcrypt.compare(password, user.password))) {
      //return ' success';
      const payload: JwtPayload = { email, role: user.role };
      const accessToken: string = await this.jwtService.sign(payload);
      return { accessToken };
    } else {
      throw new UnauthorizedException('Please check your login credentials');
    }
  }
}
