import { Controller, Get, Post, Put, Delete, Body, Param } from "@nestjs/common";
import { UserService } from "./user.service";
import { CreateUserDto } from "./dto/create.user.dto";
import { UpdateUserDto } from "./dto/update.user.dto";
import { ApiTags, ApiResponse } from '@nestjs/swagger';


@ApiTags('users')
@Controller('user')
export class UserController {
  constructor(private readonly userService: UserService) {}

  @Get()
  @ApiResponse({ status: 200, description: 'Get all users' })
  async getAllusers() {
    return this.userService.getAllUsers();
  }

  @Post()
  @ApiResponse({ status: 201, description: 'Create a new user' })
  async createUser(@Body() data: CreateUserDto) {
    return this.userService.createUser(data);
  }

  @Get(':id')
  @ApiResponse({ status: 200, description: 'Get a user by ID' })
  async getUserById(@Param('id') id: string) {
    return this.userService.getUserById(Number(id));
  }

  @Delete(':id')
  @ApiResponse({ status: 200, description: 'Delete a user by ID' })
  async deleteUserById(@Param('id') id: string) {
    return this.userService.deleteUserById(Number(id));
  }

  @Put(':id')
  @ApiResponse({ status: 200, description: 'Update a user by ID' })
  async updateUser(@Param('id') id: string, @Body() data: UpdateUserDto) {
    return this.userService.updateUser(Number(id), data);
  }
}
