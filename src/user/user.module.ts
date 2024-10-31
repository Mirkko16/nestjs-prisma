import { Module } from "@nestjs/common";
import { UserController } from "./user.controller";
import { UserService } from "./user.service";
import { Prismamodule } from "src/prisma/prisma.module";

@Module({
    controllers: [UserController],
    providers: [UserService],
    imports:[Prismamodule],
})
export class UserModule{}