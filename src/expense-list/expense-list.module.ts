import { Module } from '@nestjs/common';
import { ExpenseListService } from './expense-list.service';
import { ExpenseListController } from './expense-list.controller';
import { DbModule } from "../db/db.module";

@Module({
  imports: [DbModule],
  controllers: [ExpenseListController],
  providers: [ExpenseListService],
  exports: [ExpenseListService]
})
export class ExpenseListModule {}
