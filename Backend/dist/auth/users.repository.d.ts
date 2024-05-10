import { DataSource, Repository } from 'typeorm';
import { User } from './user.entity';
import { AuthCreadentialsDto } from './dto/auth-credentials.dto';
export declare class UserRepository extends Repository<User> {
    private datasource;
    constructor(datasource: DataSource);
    createUser(authCredentialsDto: AuthCreadentialsDto): Promise<void>;
}
