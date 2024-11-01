import { Injectable } from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";
import { User } from "@prisma/client";
import { CreateUserDto } from "./dto/create.user.dto";
import { UpdateUserDto } from "./dto/update.user.dto";
import { Prisma } from "@prisma/client";

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
            password: data.password
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
}
