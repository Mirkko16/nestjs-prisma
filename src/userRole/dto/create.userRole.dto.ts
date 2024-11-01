import {  IsString, IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateUserRoleDto {
  @ApiProperty({ description: 'userId' })
  @IsString()
  @IsNotEmpty()
  userId: number;

  @ApiProperty({ description: 'Role Id' })
  @IsString()
  @IsNotEmpty()
  roleId: number;
}
