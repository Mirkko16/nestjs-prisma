import { IsOptional, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateUserDto {
  @ApiProperty({ description: 'email password' })
  @IsOptional()
  @IsString()
  email?: string;
  password?:string;
}
