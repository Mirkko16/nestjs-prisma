// src/role/dto/update-role.dto.ts
import { IsOptional, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateUserRoleDto {
  @ApiProperty({ description: 'roleId' })
  @IsOptional()
  @IsString()
  userId?: number;

  @ApiProperty({ description: 'permissionId' })
  @IsOptional()
  @IsString()
  roleId?: number;
}
