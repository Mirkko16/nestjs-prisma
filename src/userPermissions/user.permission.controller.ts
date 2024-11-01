import { Controller, Get, Delete, Put, Param, Body, Post } from "@nestjs/common";
import { ApiResponse } from "@nestjs/swagger";
import { UserPermissionService } from "./user.permission.service";
import { UpdateUserPermissionDto } from "./dto/update.userPermission.dto";
import { CreateUserPermissionDto } from "./dto/create.userPermission.dto"

@Controller('user-permission')
export class UserPermissionController {
  constructor(private readonly userPermissionService: UserPermissionService) {}

  @Get()
  @ApiResponse({ status: 200, description: 'Get all users permission' })
  async getAllUsersPermission() {
    return this.userPermissionService.getAllUsersPermission();
  }

  @Get(':userId/:permissionId')
  @ApiResponse({ status: 200, description: 'Get a user permission by User ID and Permission ID' })
  async getUserPermissionById(
    @Param('userId') userId: string, 
    @Param('permissionId') permissionId: string
  ) {
    return this.userPermissionService.getUserPermissionById(Number(userId), Number(permissionId));
  }

  @Post()
  @ApiResponse({ status: 201, description: 'Create a new user-permission' })
  async createUserPermission(@Body() data: CreateUserPermissionDto) {
    return this.userPermissionService.createUserPermission(data);
  }

  @Delete(':UserId/:permissionId')
  @ApiResponse({ status: 200, description: 'Delete a user permission by User ID and Permission ID' })
  async deleteRolePermissionById(
    @Param('userId') userId: string, 
    @Param('permissionId') permissionId: string
  ) {
    return this.userPermissionService.deleteUserPermissionById(Number(userId), Number(permissionId));
  }

  @Put(':userId/:permissionId')
  @ApiResponse({ status: 200, description: 'Update a user permission by User ID and Permission ID' })
  async updateUserPermission(
    @Param('userId') userId: string, 
    @Param('permissionId') permissionId: string, 
    @Body() data: UpdateUserPermissionDto
  ) {
    return this.userPermissionService.updateUserPermission(Number(userId), Number(permissionId), data);
  }
}
