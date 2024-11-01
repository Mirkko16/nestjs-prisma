import { Controller, Get, Delete, Put, Param, Body, Post, ParseIntPipe } from "@nestjs/common";
import { ApiResponse } from "@nestjs/swagger";
import { UserPermissionService } from "./user.permission.service";
import { UpdateUserPermissionDto } from "./dto/update.userPermission.dto";
import { CreateUserPermissionDto } from "./dto/create.userPermission.dto"

@Controller('user-permission')
export class UserPermissionController {
  constructor(private readonly userPermissionService: UserPermissionService) { }

  @Get()
  @ApiResponse({ status: 200, description: 'Get all users permission' })
  async getAllUsersPermission() {
    return this.userPermissionService.getAllUsersPermission();
  }

  @Get(':userId/:permissionId')
  @ApiResponse({ status: 200, description: 'Get a user permission by User ID and Permission ID' })
  async getUserPermissionById(
    @Param('userId', ParseIntPipe) userId: number,
    @Param('permissionId', ParseIntPipe) permissionId: number
  ) {
    return this.userPermissionService.getUserPermissionById(userId, permissionId);
  }

  @Post()
  @ApiResponse({ status: 201, description: 'Create a new user-permission' })
  async createUserPermission(@Body() data: CreateUserPermissionDto) {
    return this.userPermissionService.createUserPermission(data);
  }

  @Delete(':userId/:permissionId')
  @ApiResponse({ status: 200, description: 'Delete a user permission by User ID and Permission ID' })
  async deleteUserPermissionById(
    @Param('userId', ParseIntPipe) userId: number,
    @Param('permissionId', ParseIntPipe) permissionId: number
  ) {
    return this.userPermissionService.deleteUserPermissionById(userId, permissionId);
  }

  @Put(':userId/:permissionId')
  @ApiResponse({ status: 200, description: 'Update a user permission by User ID and Permission ID' })
  async updateUserPermission(
    @Param('userId', ParseIntPipe) userId: number,
    @Param('permissionId', ParseIntPipe) permissionId: number,
    @Body() data: UpdateUserPermissionDto
  ) {
    return this.userPermissionService.updateUserPermission(userId, permissionId, data);
  }
}
