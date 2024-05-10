import { AuthCreadentialsDto } from './dto/auth-credentials.dto';
import { AuthService } from './auth.service';
export declare class AuthController {
    private authService;
    constructor(authService: AuthService);
    signUp(authCredentialsDto: AuthCreadentialsDto): Promise<void>;
    signIn(authCredentialsDto: AuthCreadentialsDto): Promise<{
        accessToken: string;
    }>;
    test(req: any): void;
}
