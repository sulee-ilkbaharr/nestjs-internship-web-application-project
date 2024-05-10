import { UserRepository } from './users.repository';
import { AuthCreadentialsDto } from './dto/auth-credentials.dto';
import { JwtService } from '@nestjs/jwt';
export declare class AuthService {
    private readonly usersRepository;
    private jwtService;
    constructor(usersRepository: UserRepository, jwtService: JwtService);
    signUp(authCredentialsDto: AuthCreadentialsDto): Promise<void>;
    signIn(authCredentialDto: AuthCreadentialsDto): Promise<{
        accessToken: string;
    }>;
}
