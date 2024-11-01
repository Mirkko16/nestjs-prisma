import {  IsString, IsNotEmpty, IsNumber } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateRolePermissionDto {
  @ApiProperty({ description: 'roleId' })
  @IsNumber()
  @IsNotEmpty()
  roleId: number;

  @ApiProperty({ description: 'Permission Id' })
  @IsNumber()
  @IsNotEmpty()
  permissionId: number;
}
