import { Injectable } from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";
import { UserRole } from "@prisma/client";
import { CreateUserRoleDto } from "./dto/create.userRole.dto";
import { UpdateUserRoleDto } from "./dto/update.userRole.dto";


@Injectable()
export class UserRoleService {
    constructor(private prisma: PrismaService) { }

    async getAllUsersRoles(): Promise<UserRole[]> {
        return this.prisma.userRole.findMany();
    }

    async getUserRoleById(userId: number, roleId: number): Promise<UserRole | null> {
        try {
            const UserRole = await this.prisma.userRole.findUnique({
                where: {
                    userId_roleId: {
                        userId,
                        roleId,
                    },
                },
            });
            return UserRole;
        } catch (error) {
            console.error("Error fetching User Role: ", error);
            throw error;
        }
    }

    async createUserRole(data: CreateUserRoleDto): Promise<UserRole> {
        return this.prisma.userRole.create({
            data: {
                user: {
                    connect: { id: data.userId },
                },
                role: {
                    connect: { id: data.roleId },
                },
            },
        });
    }

    async updateUserRole(userId: number, roleId: number, data: UpdateUserRoleDto): Promise<UserRole> {
        return this.prisma.userRole.update({
            where: {
                userId_roleId: {
                    userId,
                    roleId,
                },
            },
            data,
        });
    }

    async deleteUserRoleById(userId: number, roleId: number): Promise<UserRole> {
        return this.prisma.userRole.delete({
            where: {
                userId_roleId: {
                    userId,
                    roleId,
                },
            },
        });
    }
}
