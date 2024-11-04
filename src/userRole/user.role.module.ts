import { Module } from "@nestjs/common";
import { UserRoleController } from "./user.role.controller";
import { UserRoleService } from "./user.role.service";
import { Prismamodule } from "src/prisma/prisma.module";
import { PrismaService } from "src/prisma/prisma.service";
import { AuthModule } from "src/auth/auth.module";
import { UserModule } from "src/user/user.module";

@Module({
    controllers: [UserRoleController],
    providers: [UserRoleService, PrismaService],
    imports:[Prismamodule, AuthModule, UserModule],
})
export class UserRoleModule{}