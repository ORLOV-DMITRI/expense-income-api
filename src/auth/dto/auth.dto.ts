//Описываем какие параметры принимает контроллер

import { ApiProperty } from "@nestjs/swagger";
import { IsEmail, IsNotEmpty } from "class-validator";

export class SignUpBodyDto {
    @ApiProperty({
        example: "test@mail.ru"
    }) // Можно добавить пример того что нужно отправить
    @IsEmail()
    email: string;

    @ApiProperty({
        example: "123123123"
    })
    @IsNotEmpty()
    password: string;

}

export class SignInBodyDto {
    @ApiProperty({
        example: "test@mail.ru"
    }) // Можно добавить пример того что нужно отправить
    @IsEmail()
    email: string;

    @ApiProperty({
        example: "123123123"
    })
    @IsNotEmpty()
    password: string;

}

export class GetSessionInfoDto {
    @ApiProperty()
    id: number;

    @ApiProperty()
    @IsEmail()
    email: string;

    @ApiProperty()
    iat: number;

    @ApiProperty()
    exp: number;
}