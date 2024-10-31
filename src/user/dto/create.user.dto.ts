import {  IsString, IsNotEmpty } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDto {
  @ApiProperty({ description: 'email password' })
  @IsString()
  @IsNotEmpty()
  email: string;
  password: string;  
}
