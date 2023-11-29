import { BadRequestException, Injectable, UnauthorizedException } from "@nestjs/common";
import { UserService } from "../user/user.service";
import { PasswordService } from "./password.service";
import { JwtService } from "@nestjs/jwt";

// В контролере описали что будет, а в Сервисе описываем логику
@Injectable()
export class AuthService {
    constructor(private userService: UserService,
                private passService: PasswordService,
                private jwtService: JwtService) {
    }

    async signUp(email: string, password: string) {
        const user = await this.userService.findByEmail(email);

        if (user) {
            throw new BadRequestException({ type: "email-exists", message: "Такая почта уже есть" });
        }

        const salt = this.passService.getSalt();

        const hash = this.passService.getHash(password, salt);

        const newUser = await this.userService.create(email, hash, salt);

        const accessToken = await this.jwtService.signAsync({ id: newUser.id, email: newUser.email });

        return { accessToken };

    }

    async signIn(email: string, password: string) {
        const user = await this.userService.findByEmail(email);

        if (!user) {
            throw new UnauthorizedException();
        }


        const hash = this.passService.getHash(password, user.salt);

        if(hash !== user.hash) {
            throw new UnauthorizedException();

        }

        const accessToken = await this.jwtService.signAsync({ id: user.id, email: user.email });

        return { accessToken };
    }

}
