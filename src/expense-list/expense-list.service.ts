import { Injectable } from "@nestjs/common";
import { DbService } from "../db/db.service";
import { AddExpenseItemDto, ExpenseListQueryDto, PatchExpenseItemDto } from "./dto/dto";
import { contains } from "class-validator";

@Injectable()
export class ExpenseListService {

    constructor(private db: DbService) {
    }

    create(userId: number) {
        return this.db.expenseList.create({
            data: {
                ownerId: userId
            }
        });
    }

    getByUser(userId: number, query: ExpenseListQueryDto) {
        return this.db.expenseList.findUniqueOrThrow({
            where: {
                ownerId: userId
            },
            include: {
                items: {
                    where: {
                        type: {
                            contains: query.q,
                            mode: "insensitive"
                        }
                    },
                    orderBy: { createdAt: "desc" }
                }
            }
        });
    }

    async addItem(userId: number, data: AddExpenseItemDto) {
        const expenseList = await this.db.expenseList.findUniqueOrThrow({
            where: {
                ownerId: userId
            }
        });
        return this.db.expenseItem.create({
            data: {
                expenseListId: expenseList.id,
                ...data
            }
        });
    }

    async updateItem(itemId: number, update: PatchExpenseItemDto) {
        return this.db.expenseItem.update({
            where: {
                id: itemId
            },
            data: {
                ...update
            }

        });
    }

    async removeItem(userId: number, itemId: number) {
        const expenseList = await this.db.expenseList.findUniqueOrThrow({
            where: {
                ownerId: userId
            }
        });

        return this.db.expenseItem.delete({
            where: {
                expenseListId: expenseList.id,
                id: itemId
            }
        });
    }
}

