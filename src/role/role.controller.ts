import { Controller, Get, Post, Put, Delete, Body, Param } from "@nestjs/common";
import { RoleService } from "./role.service";
import { CreateRoleDto } from "./dto/create.role.dto";
import { UpdateRoleDto } from "./dto/update.role.dto";
import { ApiTags, ApiResponse } from '@nestjs/swagger';

@ApiTags('roles')
@Controller('role')
export class RoleController {
  constructor(private readonly roleService: RoleService) {}

  @Get()
  @ApiResponse({ status: 200, description: 'Get all roles' })
  async getAllRoles() {
    return this.roleService.getAllRoles();
  }

  @Post()
  @ApiResponse({ status: 201, description: 'Create a new role' })
  async createRole(@Body() data: CreateRoleDto) {
    return this.roleService.createRole(data);
  }

  @Get(':id')
  @ApiResponse({ status: 200, description: 'Get a role by ID' })
  async getRoleById(@Param('id') id: string) {
    return this.roleService.getRoleById(Number(id));
  }

  @Delete(':id')
  @ApiResponse({ status: 200, description: 'Delete a role by ID' })
  async deleteRoleById(@Param('id') id: string) {
    return this.roleService.deleteRoleById(Number(id));
  }

  @Put(':id')
  @ApiResponse({ status: 200, description: 'Update a role by ID' })
  async updateRole(@Param('id') id: string, @Body() data: UpdateRoleDto) {
    return this.roleService.updateRole(Number(id), data);
  }
}
