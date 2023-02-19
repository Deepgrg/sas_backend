import { ToLowerCase, ToTrimmed } from '@decorators/input.decorator';
import {
  ValidateIfDuplicate,
  ValidateIfExists,
} from '@decorators/validation.decorator';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsEmail,
  IsEnum,
  IsInt,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsPhoneNumber,
  IsString,
  MaxLength,
} from 'class-validator';
import { EUserTypes } from './user.enum';

export class CreateUserDto {
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

  @ValidateIfDuplicate({ table: 'sas_users', column: 'email' })
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

  @ValidateIfDuplicate({ table: 'sas_users', column: 'mobile_number' })
  @IsNotEmpty()
  @IsPhoneNumber('NP', { message: 'Invalid mobile number' })
  mobileNumber: string;

  @ApiProperty({
    enum: EUserTypes,
  })
  @IsString()
  @IsEnum(EUserTypes)
  userType: EUserTypes;
}

export class UpdateUserDto {
  @ValidateIfExists({ table: 'sas_users', column: 'id' })
  @IsNotEmpty()
  @IsNumber()
  @IsInt()
  id: number;

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

  @ValidateIfDuplicate({ table: 'sas_users', column: 'mobile_number' })
  @IsNotEmpty()
  @IsPhoneNumber('NP', { message: 'Invalid mobile number' })
  mobileNumber: string;
}
