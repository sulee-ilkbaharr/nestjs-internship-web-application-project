import { Body, Controller, Post, Req, UseGuards } from '@nestjs/common';
//import { Req, UseGuards } from '@nestjs/common';
import { AuthCreadentialsDto } from './dto/auth-credentials.dto';
import { AuthService } from './auth.service';
import { AuthGuard } from '@nestjs/passport';
import { User } from './user.entity';
//import { AuthGuard } from '@nestjs/passport';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('/signup')
  signUp(@Body() authCredentialsDto: AuthCreadentialsDto): Promise<User> {
    return this.authService.signUp(authCredentialsDto);
    console.log(authCredentialsDto);
  }

  // @Post('/signin')
  // signIn(
  //   @Body() authCredentialsDto: AuthCreadentialsDto,
  // ): Promise<{ accessToken: string }> {
  //   return this.authService.signIn(authCredentialsDto);
  // },

  @Post('/signin')
  async signIn(
    @Body() authCredentialsDto: AuthCreadentialsDto,
  ): Promise<{ accessToken: string; role: string }> {
    const accessTokenResponse =
      await this.authService.signIn(authCredentialsDto);
    const user = await this.authService.getUserByEmail(
      authCredentialsDto.email,
    );
    console.log('User role:', user.role); // Add this line to log the role
    return { ...accessTokenResponse, role: user.role };
  }

  @Post('/test')
  @UseGuards(AuthGuard())
  test(@Req() req) {
    console.log(req);
  }
}
