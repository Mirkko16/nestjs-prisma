import { Module } from "@nestjs/common";
import { RoleController } from "./role.controller";
import { RoleService } from "./role.service";
import { Prismamodule } from "src/prisma/prisma.module";
import { PrismaService } from "src/prisma/prisma.service";
import { AuthModule } from "src/auth/auth.module";
import { UserModule } from "src/user/user.module";

@Module({
    controllers: [RoleController],
    providers: [RoleService, PrismaService],
    imports:[Prismamodule, AuthModule, UserModule],
})
export class RoleModule{}