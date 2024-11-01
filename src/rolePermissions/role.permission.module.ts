import { Module } from "@nestjs/common";
import { RolePermissionController } from "./role.permission.controller";
import { RolePermissionService } from "./role.permission.service";
import { Prismamodule } from "src/prisma/prisma.module";
import { PrismaService } from "src/prisma/prisma.service";

@Module({
    controllers: [RolePermissionController],
    providers: [RolePermissionService, PrismaService],
    imports:[Prismamodule],
})
export class RolePermissionModule{}