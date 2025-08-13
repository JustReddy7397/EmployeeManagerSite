import {IsEmail} from "class-validator";

export class SignInDto {

    @IsEmail()
    email: string

    password: string

}