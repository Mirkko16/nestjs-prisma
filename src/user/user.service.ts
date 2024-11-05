import { Injectable } from "@nestjs/common";
import { PrismaService } from "../prisma/prisma.service";
import { CreateUserDto } from "./dto/create.user.dto";
import { UpdateUserDto } from "./dto/update.user.dto";
import { Prisma, User as PrismaUser, UserRole } from "@prisma/client";
import { User } from "@prisma/client"
import { UserDto } from "./dto/user.dto";

export interface UserWithRoles {
    id: number;
    name: string;
    email: string;
    password: string;
    roles: { id: number; name: string }[];
}


@Injectable()
export class UserService {
    constructor(private prisma: PrismaService) { }

    async getAllUsers(): Promise<UserDto[]> {
        const users = await this.prisma.user.findMany();
        return users.map(user => new UserDto({ id: user.id, name: user.name, email: user.email }));
    }

    async getUserById(id: number): Promise<UserDto | null> {
        const user = await this.prisma.user.findUnique({
            where: { id },
        });

        if (!user) {
            return null;
        }

        return new UserDto({
            id: user.id,
            name: user.name,
            email: user.email,
        });
    }

    async createUser(data: CreateUserDto): Promise<User> {
        const UserData: Prisma.UserCreateInput = {
            email: data.email,
            password: data.password,
            name: data.name
        };

        return this.prisma.user.create({
            data: UserData,
        });
    }

    async updateUser(id: number, data: UpdateUserDto): Promise<User> {
        return this.prisma.user.update({
            where: { id },
            data,
        });
    }

    async deleteUserById(id: number): Promise<User> {
        return this.prisma.user.delete({
            where: { id },
        });
    }


    async validateUser(name: string, password: string): Promise<UserWithRoles | null> {
        const user = await this.findByUsername(name);
        if (user && user.password === password) {
            return user as UserWithRoles;
        }
        return null;
    }

    async findByUsername(name: string): Promise<User | null> {
        return await this.prisma.user.findUnique({
            where: { name },
            include: { roles: true },
        });
    }

    async getUserWithRoles(userId: number): Promise<UserWithRoles> {
        const user = await this.prisma.user.findUnique({
            where: { id: userId },
            include: {
                roles: {
                    select: {
                        role: {
                            select: {
                                id: true,
                                name: true,
                            },
                        },
                    },
                },
            },
        });

        if (!user) throw new Error('User not found');

        return {
            id: user.id,
            name: user.name,
            email: user.email,
            password: user.password,
            roles: user.roles.map(userRole => ({
                id: userRole.role.id,
                name: userRole.role.name,
            })),
        };
    }


}
