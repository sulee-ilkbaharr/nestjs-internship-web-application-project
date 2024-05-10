import { Strategy } from 'passport-jwt';
import { UserRepository } from './users.repository';
import { JwtPayload } from 'jsonwebtoken';
import { User } from './user.entity';
declare const JwtStrategy_base: new (...args: any[]) => Strategy;
export declare class JwtStrategy extends JwtStrategy_base {
    private readonly usersRepository;
    constructor(usersRepository: UserRepository);
    validate(payload: JwtPayload): Promise<User>;
}
export {};
