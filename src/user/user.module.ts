import { Module } from "@nestjs/common";
import { UserService } from "./user.service";
import { DbModule } from "../db/db.module";
import { AccountModule } from "../account/account.module";
import { ExpenseListModule } from "../expense-list/expense-list.module";

@Module({
    imports: [DbModule, AccountModule, ExpenseListModule],
    providers: [UserService],
    exports: [UserService]
})
export class UserModule {
}
