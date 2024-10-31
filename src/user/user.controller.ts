import { Controller, Get, Post, Put, Delete, Body, Param } from "@nestjs/common";
import { UserService } from "./user.service";
import { User } from "@prisma/client"

@Controller('users')
export class UserController {

    constructor(private readonly userService: UserService) { }

    @Get()
    async getAllUsers() {
        return this.userService.getAllUsers();
    }

    @Post()
    async CreateUser(@Body() data: User) {
        return this.userService.createUser(data)
    }


    @Get(':id')
    async getUserById(@Param('id') id: string) {
        return this.userService.getUserById(Number(id));
    }

    @Delete(':id')
    async deteteUserById(@Param('id') id: string) {
        return this.userService.deleteUserById(Number(id));
    }

    @Put(':id')
    async updateUser(@Param('id') id: string, @Body() data: User) {
        return this.userService.updateUser(Number(id), data);
    }
}
