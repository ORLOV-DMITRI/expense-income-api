import { Injectable } from "@nestjs/common";
import { PatchAccountDto } from "./dto/dto";
import { DbService } from "../db/db.service";

@Injectable()
export class AccountService {
    constructor(private db: DbService) {
    }

    async create(userId: number) {
        return this.db.account.create({
            data: {
                ownerId: userId,
                username: ""
            }
        });
    }

    async getAccount(userId: number) {

        return this.db.account.findFirstOrThrow({
            where: {
                ownerId: userId
            }
        });

    }

    async patchAccount(userId: number, patch: PatchAccountDto) {
        return this.db.account.update({
            where: { ownerId: userId },
            data: {
                ...patch
            }
        });
    }

}
