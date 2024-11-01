import { Controller, Get, Delete, Put, Param, Body, Post } from "@nestjs/common";
import { ApiResponse } from "@nestjs/swagger";
import { UserRoleService } from "./user.role.service";
import { UpdateUserRoleDto } from "./dto/update.userRole.dto";
import { CreateUserRoleDto } from "./dto/create.userRole.dto";

@Controller('user-role')
export class UserRoleController {
  constructor(private readonly userRoleService: UserRoleService) {}

  @Get()
  @ApiResponse({ status: 200, description: 'Get all users roles' })
  async getAllUsersRoles() {
    return this.userRoleService.getAllUsersRoles();
  }

  @Get(':userId/:roleId')
  @ApiResponse({ status: 200, description: 'Get a user role by user ID and Role ID' })
  async getUserRoleById(
    @Param('userId') userId: string, 
    @Param('roleId') roleId: string
  ) {
    return this.userRoleService.getUserRoleById(Number(userId), Number(roleId));
  }

  @Post()
  @ApiResponse({ status: 201, description: 'Create a new user-role' })
  async createUserRole(@Body() data: CreateUserRoleDto) {
    return this.userRoleService.createUserRole(data);
  }



  @Delete(':userId/:roleId')
  @ApiResponse({ status: 200, description: 'Delete a user role by User ID and Role ID' })
  async deleteUserRoleById(
    @Param('userId') userId: string, 
    @Param('roleId') roleId: string
  ) {
    return this.userRoleService.deleteUserRoleById(Number(userId), Number(roleId));
  }

  @Put(':userId/:roleId')
  @ApiResponse({ status: 200, description: 'Update a user role by User ID and Role ID' })
  async updateUserRole(
    @Param('userId') userId: string, 
    @Param('roleId') roleId: string, 
    @Body() data: UpdateUserRoleDto
  ) {
    return this.userRoleService.updateUserRole(Number(userId), Number(roleId), data);
  }
}
