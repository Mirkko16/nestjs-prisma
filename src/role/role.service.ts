import { Injectable } from "@nestjs/common";
import { PrismaService } from "../prisma/prisma.service";
import { Role } from "@prisma/client";
import { CreateRoleDto } from "./dto/create.role.dto";
import { UpdateRoleDto } from "./dto/update.role.dto";
import { Prisma } from "@prisma/client";

@Injectable()
export class RoleService {
    constructor(private prisma: PrismaService) { }

    async getAllRoles(): Promise<Role[]> {
        return this.prisma.role.findMany();
    }

    async getRoleById(id: number): Promise<Role> {
        return this.prisma.role.findUnique({
            where: { id },
        });
    }

    async createRole(data: CreateRoleDto): Promise<Role> {
        const roleData: Prisma.RoleCreateInput = {
            name: data.name,
        };
    
        return this.prisma.role.create({
            data: roleData,
        });
    }

    async updateRole(id: number, data: UpdateRoleDto): Promise<Role> {
        return this.prisma.role.update({
            where: { id },
            data,
        });
    }

    async deleteRoleById(id: number): Promise<Role> {
        return this.prisma.role.delete({
            where: { id },
        });
    }
}
