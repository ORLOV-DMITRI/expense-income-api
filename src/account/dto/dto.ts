import { ApiProperty } from "@nestjs/swagger";
import { IsOptional } from "class-validator";

export class AccountDto {
    @ApiProperty()
    id: number;

    @ApiProperty()
    ownerId: number;

    @ApiProperty()
    username: string;
}

export class PatchAccountDto {
    @ApiProperty({required: false})
    @IsOptional()
    username?: string
}