import {  IsString, IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateRolePermissionDto {
  @ApiProperty({ description: 'roleId' })
  @IsString()
  @IsNotEmpty()
  roleId: number;

  @ApiProperty({ description: 'Permission Id' })
  @IsString()
  @IsNotEmpty()
  permissionId: number;
}
