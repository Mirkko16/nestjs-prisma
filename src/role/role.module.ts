import { Module } from "@nestjs/common";
import { RoleController } from "./role.controller";
import { RoleService } from "./role.service";
import { Prismamodule } from "src/prisma/prisma.module";
import { PrismaService } from "src/prisma/prisma.service";

@Module({
    controllers: [RoleController],
    providers: [RoleService, PrismaService],
    imports:[Prismamodule],
})
export class RoleModule{}