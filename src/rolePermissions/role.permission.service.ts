import { Injectable } from "@nestjs/common";
import { PrismaService } from "../prisma/prisma.service";
import { RolePermission } from "@prisma/client";
import { CreateRolePermissionDto } from "./dto/create.rolePermission.dto";
import { UpdateRolePermissionDto } from "./dto/update.rolePermission.dto";
import { Prisma } from "@prisma/client";

@Injectable()
export class RolePermissionService {
    constructor(private prisma: PrismaService) { }

    async getAllRolePermission(): Promise<RolePermission[]> {
        return this.prisma.rolePermission.findMany();
    }

    async getRolePermissionById(roleId: number, permissionId: number): Promise<RolePermission | null> {
        try {
            const rolePermission = await this.prisma.rolePermission.findUnique({
                where: {
                    roleId_permissionId: {
                        roleId,
                        permissionId,
                    },
                },
            });
            return rolePermission;
        } catch (error) {
            console.error("Error fetching RolePermission:", error);
            throw error;
        }
    }

    async createRolePermission(data: CreateRolePermissionDto): Promise<RolePermission> {
        return this.prisma.rolePermission.create({
            data: {
                role: {
                    connect: { id: data.roleId },
                },
                permission: {
                    connect: { id: data.permissionId },
                },
            },
        });
    }

    async updateRolePermission(roleId: number, permissionId: number, data: UpdateRolePermissionDto): Promise<RolePermission> {
        return this.prisma.rolePermission.update({
            where: {
                roleId_permissionId: {
                    roleId,
                    permissionId,
                },
            },
            data,
        });
    }

    async deleteRolePermissionById(roleId: number, permissionId: number): Promise<RolePermission> {
        return this.prisma.rolePermission.delete({
            where: {
                roleId_permissionId: {
                    roleId,
                    permissionId,
                },
            },
        });
    }
}
