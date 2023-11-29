import { ApiProperty } from "@nestjs/swagger";
import { $Enums } from "@prisma/client";
import { IsIn, IsOptional } from "class-validator";


export class ExpenseTypeDto {
    @ApiProperty()
    id: number;

    @ApiProperty()
    name: string;

    @ApiProperty({
        type: [$Enums.ExpenseFormType.Full, $Enums.ExpenseFormType.Single]
    })
    formType: $Enums.ExpenseFormType;

}

export class ExpenseItemDto {
    @ApiProperty()
    id: number;

    @ApiProperty()
    name: string;

    @ApiProperty()
    count: number;

    @ApiProperty()
    price: number;

    @ApiProperty()
    createdAt: Date;

    @ApiProperty()
    type: string;

}


export class ExpenseListDto {
    @ApiProperty()
    id: number;

    @ApiProperty()
    ownerId: number;

    @ApiProperty({
        type: [ExpenseItemDto]
    })
    items: ExpenseItemDto[];

}

export class ExpenseListQueryDto {
    @ApiProperty({ required: false })
    @IsOptional()
    q?: string;
}

export class AddExpenseItemDto {
    @IsOptional()
    @ApiProperty()
    name?: string;

    @ApiProperty()
    @IsOptional()
    count?: number;

    @ApiProperty()
    price: number;

    @ApiProperty()
    type: string;
}

export class PatchExpenseItemDto {


    @IsOptional()
    @ApiProperty()
    name?: string;

    @ApiProperty()
    @IsOptional()
    count?: number;

    @ApiProperty()
    @IsOptional()
    price?: number;

    @ApiProperty()
    @IsOptional()
    createdAt: Date;

    @ApiProperty()
    @IsOptional()
    type?: string;
}


export class AddExpenseTypeDto {
    @ApiProperty()
    name: string;

    @ApiProperty({
        type: [$Enums.ExpenseFormType.Full, $Enums.ExpenseFormType.Single]
    })
    @IsIn([$Enums.ExpenseFormType.Full, $Enums.ExpenseFormType.Single])
    formType: $Enums.ExpenseFormType;
}