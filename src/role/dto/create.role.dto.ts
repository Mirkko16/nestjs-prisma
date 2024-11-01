// src/role/dto/create-role.dto.ts
import {  IsString, IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateRoleDto {
  @ApiProperty({ description: 'name' })
  @IsString()
  @IsNotEmpty()
  name: string;
}
