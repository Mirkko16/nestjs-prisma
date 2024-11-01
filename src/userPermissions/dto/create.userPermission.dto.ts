import {  IsString, IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateUserPermissionDto {
  @ApiProperty({ description: 'UserId' })
  @IsString()
  @IsNotEmpty()
  userId: number;

  @ApiProperty({ description: 'Permission Id' })
  @IsString()
  @IsNotEmpty()
  permissionId: number;
}
