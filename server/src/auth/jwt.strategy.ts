import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { jwtConstants } from './constants';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor(private usersService: UsersService) {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: false,
            secretOrKey: jwtConstants.secret ?? 'jwtSecretKey',
        });
    }

    async validate(payload: any) {
        const user = await this.usersService.user({ id: payload.sub });

        if (!user) {
            return null;
        }

        // return { userId: payload.sub, email: payload.email, id: payload.id };
        return {
            id: user.id,
            email: user.email,
            name: user.name,
        };
    }
}