import { Module } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { AuthController } from "./auth.controller";
import { PasswordService } from "./password.service";
import { CookieService } from "./cookie.service";
import { UserModule } from "../user/user.module";
import { JwtModule } from "@nestjs/jwt";
import * as process from "process";

@Module({
    imports: [UserModule, JwtModule.register({
        global: true,
        secret: process.env.SECRET,
        signOptions: { expiresIn: "15d" }
    })],
    controllers: [AuthController],
    providers: [AuthService, PasswordService, CookieService]
})
export class AuthModule {
}
