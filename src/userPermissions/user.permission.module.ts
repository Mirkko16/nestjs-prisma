import { Module } from "@nestjs/common";
import { UserPermissionController } from "./user.permission.controller";
import { UserPermissionService } from "./user.permission.service";
import { Prismamodule } from "src/prisma/prisma.module";
import { PrismaService } from "src/prisma/prisma.service";

@Module({
    controllers: [UserPermissionController],
    providers: [UserPermissionService, PrismaService],
    imports:[Prismamodule],
})
export class UserPermissionModule{}