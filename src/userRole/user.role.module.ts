import { Module } from "@nestjs/common";
import { UserRoleController } from "./user.role.controller";
import { UserRoleService } from "./user.role.service";
import { Prismamodule } from "src/prisma/prisma.module";
import { PrismaService } from "src/prisma/prisma.service";

@Module({
    controllers: [UserRoleController],
    providers: [UserRoleService, PrismaService],
    imports:[Prismamodule],
})
export class UserRoleModule{}