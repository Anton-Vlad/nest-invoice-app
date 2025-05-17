import { IsEmail, IsString } from 'class-validator';
import { Exclude } from 'class-transformer';

export class UserDto {
    id: string;

    @IsString()
    name: string;

    @IsEmail()
    email: string;

    @Exclude()
    password: string;

    constructor(partial: Partial<UserDto>) {
        Object.assign(this, partial);
    }
}