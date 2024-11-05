import { Controller, Get, Post, Put, Delete, Body, Param, UseGuards } from "@nestjs/common";
import { UserService } from "./user.service";
import { CreateUserDto } from "./dto/create.user.dto";
import { UpdateUserDto } from "./dto/update.user.dto";
import { ApiTags, ApiResponse, ApiBearerAuth } from '@nestjs/swagger';
import { AuthGuard } from "../middlewares/auth.guard";
import { UserDto } from "./dto/user.dto";



@ApiTags('users')
@Controller('user')
@ApiBearerAuth()


export class UserController {
  constructor(private readonly userService: UserService) { }

  @Get()
  @ApiResponse({ status: 200, description: 'Get all users' })
  async getAllUsers() {
    return this.userService.getAllUsers();
  }

  @Post()
  @UseGuards(AuthGuard)
  @ApiResponse({ status: 201, description: 'Create a new user' })
  async createUser(@Body() data: CreateUserDto) {
    return this.userService.createUser(data);
  }

  @Get(':id')
  @ApiResponse({ status: 200, description: 'Get a user by ID' })
  async getUserById(@Param('id') id: number): Promise<UserDto | null> {
    return this.userService.getUserById(Number(id));
  }

  @Delete(':id')
  @UseGuards(AuthGuard)
  @ApiResponse({ status: 200, description: 'Delete a user by ID' })
  async deleteUserById(@Param('id') id: number) {
    return this.userService.deleteUserById(Number(id));
  }

  @Put(':id')
  @UseGuards(AuthGuard)
  @ApiResponse({ status: 200, description: 'Update a user by ID' })
  async updateUser(@Param('id') id: string, @Body() data: UpdateUserDto) {
    return this.userService.updateUser(Number(id), data);
  }
}