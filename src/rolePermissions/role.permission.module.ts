import { Module } from "@nestjs/common";
import { RolePermissionController } from "./role.permission.controller";
import { RolePermissionService } from "./role.permission.service";
import { Prismamodule } from "src/prisma/prisma.module";
import { PrismaService } from "src/prisma/prisma.service";
import { AuthModule } from "src/auth/auth.module";
import { UserModule } from "src/user/user.module";

@Module({
    controllers: [RolePermissionController],
    providers: [RolePermissionService, PrismaService],
    imports:[Prismamodule, AuthModule, UserModule],
})
export class RolePermissionModule{}