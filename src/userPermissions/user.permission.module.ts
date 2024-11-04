import { Module } from "@nestjs/common";
import { UserPermissionController } from "./user.permission.controller";
import { UserPermissionService } from "./user.permission.service";
import { Prismamodule } from "src/prisma/prisma.module";
import { PrismaService } from "src/prisma/prisma.service";
import { AuthModule } from "src/auth/auth.module";
import { UserModule } from "src/user/user.module";

@Module({
    controllers: [UserPermissionController],
    providers: [UserPermissionService, PrismaService],
    imports:[Prismamodule, AuthModule, UserModule],
})
export class UserPermissionModule{}