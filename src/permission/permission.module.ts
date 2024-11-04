import { Module } from "@nestjs/common";
import { PermissionController } from "./permission.controller";
import { PermissionService } from "./permission.service";
import { Prismamodule } from "src/prisma/prisma.module";
import { PrismaService } from "src/prisma/prisma.service";
import { AuthModule } from "src/auth/auth.module";
import { UserModule } from "src/user/user.module";

@Module({
    controllers: [PermissionController],
    providers: [PermissionService, PrismaService],
    imports:[Prismamodule, AuthModule, UserModule],
})
export class PermissionModule{}