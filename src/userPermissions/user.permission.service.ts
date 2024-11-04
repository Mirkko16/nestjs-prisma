import { Injectable } from "@nestjs/common";
import { PrismaService } from "../prisma/prisma.service";
import { UserPermission } from "@prisma/client";
import { CreateUserPermissionDto } from "./dto/create.userPermission.dto";
import { UpdateUserPermissionDto } from "./dto/update.userPermission.dto";
import { Prisma } from "@prisma/client";

@Injectable()
export class UserPermissionService {
    constructor(private prisma: PrismaService) { }

    async getAllUsersPermission(): Promise<UserPermission[]> {
        return this.prisma.userPermission.findMany();
    }

    async getUserPermissionById(userId: number, permissionId: number): Promise<UserPermission | null> {
        try {
            const userPermission = await this.prisma.userPermission.findUnique({
                where: {
                    userId_permissionId: {
                        userId,
                        permissionId,
                    },
                },
            });
            return userPermission;
        } catch (error) {
            console.error("Error fetching RolePermission:", error);
            throw error;
        }
    }

    async createUserPermission(data: CreateUserPermissionDto): Promise<UserPermission> {
        return this.prisma.userPermission.create({
            data: {
                user: {
                    connect: { id: data.userId },
                },
                permission: {
                    connect: { id: data.permissionId },
                },
            },
        });
    }

    async updateUserPermission(userId: number, permissionId: number, data: UpdateUserPermissionDto): Promise<UserPermission> {
        return this.prisma.userPermission.update({
            where: {
                userId_permissionId: {
                    userId,
                    permissionId,
                },
            },
            data,
        });
    }

    async deleteUserPermissionById(userId: number, permissionId: number): Promise<UserPermission> {
        return this.prisma.userPermission.delete({
            where: {
                userId_permissionId: {
                    userId,
                    permissionId,
                },
            },
        });
    }
}
