import { Body, Controller, Delete, Get, Param, ParseIntPipe, Patch, Post, Query, UseGuards } from "@nestjs/common";
import { ExpenseListService } from "./expense-list.service";
import { ApiCreatedResponse, ApiOkResponse } from "@nestjs/swagger";
import { AddExpenseItemDto, ExpenseItemDto, ExpenseListDto, ExpenseListQueryDto, PatchExpenseItemDto } from "./dto/dto";
import { AuthGuard } from "../auth/auth.guard";
import { SessionInfo } from "../auth/session-info.decorator";
import { GetSessionInfoDto } from "../auth/dto/auth.dto";

@Controller("expense-list")
@UseGuards(AuthGuard)
export class ExpenseListController {
    constructor(private readonly expenseListService: ExpenseListService) {
    }

    @Get()
    @ApiOkResponse({
        type: ExpenseListDto
    })
    getList(
      @Query() query: ExpenseListQueryDto,
      @SessionInfo() session: GetSessionInfoDto
    ): Promise<ExpenseListDto> {
        return this.expenseListService.getByUser(session.id, query);
    }


    @Post("item")
    @ApiCreatedResponse({
        type: ExpenseItemDto
    })
    addExpenseItem(
      @Body() body: AddExpenseItemDto,
      @SessionInfo() session: GetSessionInfoDto
    ): Promise<ExpenseItemDto> {
        return this.expenseListService.addItem(session.id, body);

    }


    @Patch("item/:id")
    @ApiCreatedResponse({
        type: ExpenseItemDto
    })
    patchExpenseItem(
      @Body() body: PatchExpenseItemDto,
      @Param("id", ParseIntPipe) itemId: number
    ): Promise<ExpenseItemDto> {
        return this.expenseListService.updateItem(itemId, body);
    }


    @Delete("item/:id")
    @ApiOkResponse({
        type: ExpenseItemDto
    })
    async removeExpenseItem(
      @Param("id", ParseIntPipe) id: number,
      @SessionInfo() session: GetSessionInfoDto
    ): Promise<ExpenseItemDto> {
        return await this.expenseListService.removeItem(session.id, id);

    }


}
