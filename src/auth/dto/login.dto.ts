import { IsNotEmpty, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class LoginDto {
    @ApiProperty({ description: 'UserName' })
    @IsString()
    @IsNotEmpty()
    username: string;

    @ApiProperty({ description: 'Password' })
    @IsString()
    @IsNotEmpty()
    password: string;
}