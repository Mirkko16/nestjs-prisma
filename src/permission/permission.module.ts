import { Module } from "@nestjs/common";
import { PermissionController } from "./permission.controller";
import { PermissionService } from "./permission.service";
import { Prismamodule } from "src/prisma/prisma.module";
import { PrismaService } from "src/prisma/prisma.service";

@Module({
    controllers: [PermissionController],
    providers: [PermissionService, PrismaService],
    imports:[Prismamodule],
})
export class PermissionModule{}