import { Injectable } from "@nestjs/common";
import { PrismaService } from "../prisma/prisma.service";
import { Permission } from "@prisma/client";
import { CreatePermissionDto } from "./dto/create.permission.dto";
import { UpdatePermissionDto } from "./dto/update.permission.dto";
import { Prisma } from "@prisma/client";

@Injectable()
export class PermissionService {
    constructor(private prisma: PrismaService) { }

    async getAllPermissions(): Promise<Permission[]> {
        return this.prisma.permission.findMany();
    }

    async getPermissionById(id: number): Promise<Permission> {
        return this.prisma.permission.findUnique({
            where: { id },
        });
    }

    async createPermission(data: CreatePermissionDto): Promise<Permission> {
        const permissionData: Prisma.PermissionCreateInput = {
            name: data.name,
        };
    
        return this.prisma.permission.create({
            data: permissionData,
        });
    }

    async updatePermission(id: number, data: UpdatePermissionDto): Promise<Permission> {
        return this.prisma.permission.update({
            where: { id },
            data,
        });
    }

    async deletePermissionById(id: number): Promise<Permission> {
        return this.prisma.permission.delete({
            where: { id },
        });
    }
}
