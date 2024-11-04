import { Controller, Get, Delete, Put, Param, Body, Post, ParseIntPipe, UseGuards } from "@nestjs/common";
import { ApiBearerAuth, ApiResponse } from "@nestjs/swagger";
import { RolePermissionService } from "./role.permission.service";
import { UpdateRolePermissionDto } from "./dto/update.rolePermission.dto";
import { CreateRolePermissionDto } from "./dto/create.rolePermission.dto"
import { AuthGuard } from "../../middlewares/auth.guard";

@Controller('role-permission')
@ApiBearerAuth()
export class RolePermissionController {
  constructor(private readonly rolePermissionService: RolePermissionService) { }

  @Get()
  @ApiResponse({ status: 200, description: 'Get all permission roles' })
  async getAllRolesPermission() {
    return this.rolePermissionService.getAllRolePermission();
  }

  @Get(':roleId/:permissionId')
  @ApiResponse({ status: 200, description: 'Get a role permission by Role ID and Permission ID' })
  async getRolePermissionById(
    @Param('roleId', ParseIntPipe) roleId: number,
    @Param('permissionId', ParseIntPipe) permissionId: number
  ) {
    return this.rolePermissionService.getRolePermissionById(roleId, permissionId);
  }

  @Post()
  @UseGuards(AuthGuard)
  @ApiResponse({ status: 201, description: 'Create a new role-permission' })
  async createRolePermission(@Body() data: CreateRolePermissionDto) {
    return this.rolePermissionService.createRolePermission(data);
  }

  @Delete(':roleId/:permissionId')
  @UseGuards(AuthGuard)
  @ApiResponse({ status: 200, description: 'Delete a role permission by Role ID and Permission ID' })
  async deleteRolePermissionById(
    @Param('roleId', ParseIntPipe) roleId: number,
    @Param('permissionId', ParseIntPipe) permissionId: number
  ) {
    return this.rolePermissionService.deleteRolePermissionById(roleId, permissionId);
  }

  @Put(':roleId/:permissionId')
  @UseGuards(AuthGuard)
  @ApiResponse({ status: 200, description: 'Update a role permission by Role ID and Permission ID' })
  async updateRolePermission(
    @Param('roleId', ParseIntPipe) roleId: number,
    @Param('permissionId', ParseIntPipe) permissionId: number,
    @Body() data: UpdateRolePermissionDto
  ) {
    return this.rolePermissionService.updateRolePermission(roleId, permissionId, data);
  }
}
