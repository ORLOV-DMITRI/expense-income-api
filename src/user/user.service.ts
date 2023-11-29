import { Injectable } from "@nestjs/common";
import { CreateUserDto } from "./dto/create-user.dto";
import { UpdateUserDto } from "./dto/update-user.dto";
import { DbService } from "../db/db.service";
import { AccountService } from "../account/account.service";
import { ExpenseListService } from "../expense-list/expense-list.service";

@Injectable()
export class UserService {
    constructor(
      private db: DbService,
      private accountService: AccountService,
      private expenseListService: ExpenseListService
    ) {
    }

    async findByEmail(email: string) {
        return this.db.user.findFirst({
            where: {
                email
            }
        });
    }

    async create(email: string, hash: string, salt: string) {
        const user = await this.db.user.create({
            data: {
                email,
                hash,
                salt
            }
        });
        await this.accountService.create(user.id);
        await this.expenseListService.create(user.id);

        return user;
    }
}
