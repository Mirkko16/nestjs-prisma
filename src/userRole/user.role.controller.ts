import { Controller, Get, Delete, Put, Param, Body, Post, ParseIntPipe } from "@nestjs/common";
import { ApiResponse } from "@nestjs/swagger";
import { UserRoleService } from "./user.role.service";
import { UpdateUserRoleDto } from "./dto/update.userRole.dto";
import { CreateUserRoleDto } from "./dto/create.userRole.dto";

@Controller('user-role')
export class UserRoleController {
  constructor(private readonly userRoleService: UserRoleService) { }

  @Get()
  @ApiResponse({ status: 200, description: 'Get all users roles' })
  async getAllUsersRoles() {
    return this.userRoleService.getAllUsersRoles();
  }

  @Get(':userId/:roleId')
  @ApiResponse({ status: 200, description: 'Get a user role by user ID and Role ID' })
  async getUserRoleById(
    @Param('userId', ParseIntPipe) userId: number,
    @Param('roleId', ParseIntPipe) roleId: number
  ) {
    return this.userRoleService.getUserRoleById(userId, roleId);
  }

  @Post()
  @ApiResponse({ status: 201, description: 'Create a new user-role' })
  async createUserRole(@Body() data: CreateUserRoleDto) {
    return this.userRoleService.createUserRole(data);
  }



  @Delete(':userId/:roleId')
  @ApiResponse({ status: 200, description: 'Delete a user role by User ID and Role ID' })
  async deleteUserRoleById(
    @Param('userId', ParseIntPipe) userId: number,
    @Param('roleId', ParseIntPipe) roleId: number
  ) {
    return this.userRoleService.deleteUserRoleById(userId, roleId);
  }

  @Put(':userId/:roleId')
  @ApiResponse({ status: 200, description: 'Update a user role by User ID and Role ID' })
  async updateUserRole(
    @Param('userId', ParseIntPipe) userId: number,
    @Param('roleId', ParseIntPipe) roleId: number,
    @Body() data: UpdateUserRoleDto
  ) {
    return this.userRoleService.updateUserRole(userId, roleId, data);
  }
}
