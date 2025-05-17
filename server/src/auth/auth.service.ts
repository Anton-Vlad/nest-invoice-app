import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class AuthService {
    constructor(
        private usersService: UsersService,
        private jwtService: JwtService,
    ) { }

    async validateUser(email: string, pass: string): Promise<any> {
        return this.usersService.validateUser(email, pass);
    }

    async login(user: any): Promise<any> {
        const payload = { email: user.email, sub: user.userId };
        return {
            access_token: this.jwtService.sign(payload),
        };
    }
}