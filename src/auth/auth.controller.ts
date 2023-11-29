import { Controller, Get, Post, HttpStatus, HttpCode, Body, Res, UseGuards } from "@nestjs/common";
import { AuthService } from "./auth.service";
import { GetSessionInfoDto, SignInBodyDto, SignUpBodyDto } from "./dto/auth.dto";
import { ApiCreatedResponse, ApiOkResponse } from "@nestjs/swagger";
import { CookieService } from "./cookie.service";
import { Response } from "express";
import { AuthGuard } from "./auth.guard";
import { SessionInfo } from "./session-info.decorator";

// Контролер просто принимает запрос и body


@Controller("auth")
export class AuthController {
    constructor(private readonly authService: AuthService,
                private cookieService: CookieService) {
    }

    @Post("sign-up")
    @ApiCreatedResponse() // Возвращаем это после создания
    async signUp(@Body() body: SignUpBodyDto, @Res({ passthrough: true }) res: Response) { //Для регистрации
        const { accessToken } = await this.authService.signUp(body.email, body.password);
        this.cookieService.setToken(res, accessToken);

    }


    @Post("sign-in")
    @ApiOkResponse() // Возвращаем ОК если требуется просто подтвердить что всё окей
    @HttpCode(HttpStatus.OK) // Возвращаем 200 Ок, если всё ок
    async signIn(@Body() body: SignInBodyDto, @Res({ passthrough: true }) res: Response) {// Для входа
        const { accessToken } = await this.authService.signIn(body.email, body.password);
        this.cookieService.setToken(res, accessToken);
    }


    @Post("sign-out")
    @ApiOkResponse() // Возвращаем ОК если требуется просто подтвердить что всё окей
    @HttpCode(HttpStatus.OK)
    @UseGuards(AuthGuard)
    signOut(@Res({ passthrough: true }) res: Response) {
        this.cookieService.removeToken(res);
    }

    @Get("session")
    @ApiOkResponse({ type: GetSessionInfoDto }) // Возвращаем ОК и указываем тип возвращаемого значения
    @UseGuards(AuthGuard)
    getSession(@SessionInfo() session: GetSessionInfoDto) {
        return session
    }
}
