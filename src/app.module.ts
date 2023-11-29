import { Module } from "@nestjs/common";
import { UserModule } from "./user/user.module";
import { AuthModule } from "./auth/auth.module";
import { ConfigModule } from "@nestjs/config";
import { DbModule } from './db/db.module';
import { AccountModule } from './account/account.module';
import { ExpenseListModule } from './expense-list/expense-list.module';

@Module({
  imports: [UserModule, AuthModule, ConfigModule.forRoot({ isGlobal: true }), DbModule, AccountModule, ExpenseListModule]
})
export class AppModule {}
