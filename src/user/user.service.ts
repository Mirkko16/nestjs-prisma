import { Injectable } from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";
import { CreateUserDto } from "./dto/create.user.dto";
import { UpdateUserDto } from "./dto/update.user.dto";
import { Prisma, User as PrismaUser, UserRole } from "@prisma/client";
import { User } from "@prisma/client"

export interface UserWithRoles {
    id: number;
    name: string;
    email: string;
    password: string;
    roles: { name: string }[]; // La propiedad roles debe tener la forma correcta
}


@Injectable()
export class UserService {
    constructor(private prisma: PrismaService) { }

    async getAllUsers(): Promise<User[]> {
        return this.prisma.user.findMany();
    }

    async getUserById(id: number): Promise<User> {
        return this.prisma.user.findUnique({
            where: { id },
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
            return user as UserWithRoles; // Asegúrate de que el tipo coincide
        }
        return null;
    }


    // Método findByUsername
    async findByUsername(name: string): Promise<User | null> {
        return await this.prisma.user.findUnique({
            where: { name },
            include: { roles: true },
        });
    }

    // user.service.ts
    async getUserWithRoles(userId: number): Promise<UserWithRoles> {
        const user = await this.prisma.user.findUnique({
            where: { id: userId },
            include: {
                roles: {
                    select: {
                        role: {
                            select: {
                                name: true,
                            },
                        },
                    },
                },
            },
        });
    
        // Si el usuario no existe, maneja el caso aquí
        if (!user) throw new Error('User not found');
    
        return {
            id: user.id,
            name: user.name,
            email: user.email,
            password: user.password,
            roles: user.roles.map(userRole => ({ name: userRole.role.name })), // Mapea correctamente los roles
        };
    }



}
