import { Controller, Get, Delete, Put, Param, Body, Post } from "@nestjs/common";
import { ApiResponse } from "@nestjs/swagger";
import { RolePermissionService } from "./role.permission.service";
import { UpdateRolePermissionDto } from "./dto/update.rolePermission.dto";
import { CreateRolePermissionDto } from "./dto/create.rolePermission.dto"

@Controller('role-permission')
export class RolePermissionController {
  constructor(private readonly rolePermissionService: RolePermissionService) {}

  @Get()
  @ApiResponse({ status: 200, description: 'Get all permission roles' })
  async getAllRolesPermission() {
    return this.rolePermissionService.getAllRolePermission();
  }

  @Get(':roleId/:permissionId')
  @ApiResponse({ status: 200, description: 'Get a role permission by Role ID and Permission ID' })
  async getRolePermissionById(
    @Param('roleId') roleId: string, 
    @Param('permissionId') permissionId: string
  ) {
    return this.rolePermissionService.getRolePermissionById(Number(roleId), Number(permissionId));
  }

  @Post()
  @ApiResponse({ status: 201, description: 'Create a new role-permission' })
  async createRolePermission(@Body() data: CreateRolePermissionDto) {
    return this.rolePermissionService.createRolePermission(data);
  }

  @Delete(':roleId/:permissionId')
  @ApiResponse({ status: 200, description: 'Delete a role permission by Role ID and Permission ID' })
  async deleteRolePermissionById(
    @Param('roleId') roleId: string, 
    @Param('permissionId') permissionId: string
  ) {
    return this.rolePermissionService.deleteRolePermissionById(Number(roleId), Number(permissionId));
  }

  @Put(':roleId/:permissionId')
  @ApiResponse({ status: 200, description: 'Update a role permission by Role ID and Permission ID' })
  async updateRolePermission(
    @Param('roleId') roleId: string, 
    @Param('permissionId') permissionId: string, 
    @Body() data: UpdateRolePermissionDto
  ) {
    return this.rolePermissionService.updateRolePermission(Number(roleId), Number(permissionId), data);
  }
}
