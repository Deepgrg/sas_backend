import { ToTrimmed, ToLowerCase } from '@decorators/input.decorator';
import { ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsNotEmpty,
  IsString,
  MaxLength,
  IsOptional,
  IsEmail,
  IsPhoneNumber,
} from 'class-validator';

export class RegisterUserDto {
  @IsNotEmpty()
  @IsString()
  @MaxLength(30)
  firstName: string;

  @ApiPropertyOptional()
  @IsOptional()
  @IsString()
  @MaxLength(30)
  middleName: string;

  @IsNotEmpty()
  @IsString()
  @MaxLength(30)
  lastName: string;

  @IsNotEmpty()
  @IsString()
  @ToTrimmed()
  @ToLowerCase()
  @MaxLength(50)
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @IsString()
  @MaxLength(50)
  password: string;

  @IsNotEmpty()
  @IsPhoneNumber('NP', { message: 'Invalid mobile number' })
  mobileNumber: string;
}

export class LoginDto {
  @IsNotEmpty()
  @IsString()
  @ToTrimmed()
  @ToLowerCase()
  @MaxLength(50)
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @IsString()
  @MaxLength(50)
  password: string;
}
