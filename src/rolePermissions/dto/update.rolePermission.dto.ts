// src/role/dto/update-role.dto.ts
import { IsOptional, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateRolePermissionDto {
  @ApiProperty({ description: 'roleId' })
  @IsOptional()
  @IsString()
  roleId?: number;

  @ApiProperty({ description: 'permissionId' })
  @IsOptional()
  @IsString()
  permissionId?: number;
}
