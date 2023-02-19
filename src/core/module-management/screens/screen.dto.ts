import {
  ValidateIfExists,
  ValidateIfDuplicate,
  ValidateArrayIfExists,
} from '@decorators/validation.decorator';
import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import {
  IsNotEmpty,
  IsNumber,
  IsInt,
  IsString,
  MaxLength,
  IsArray,
  ValidateNested,
} from 'class-validator';
import { EndpointDto } from '../screen-privilege-mappings/screen-privilege-mapping.interface';

export class CreateScreenDto {
  @ValidateIfDuplicate({ table: 'sas_screens', column: 'name' })
  @IsNotEmpty()
  @IsString()
  @MaxLength(30)
  name: string;

  @IsNotEmpty()
  @IsString()
  @MaxLength(255)
  description: string;

  @ValidateIfExists({ table: 'sas_modules', column: 'id' })
  @IsNotEmpty()
  @IsNumber()
  @IsInt()
  moduleId: number;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => EndpointDto)
  endPoints: EndpointDto[];
}

export class UpdateScreenDto {
  @ValidateIfExists({ table: 'sas_screens', column: 'id' })
  @IsNotEmpty()
  @IsNumber()
  @IsInt()
  id: number;

  @ValidateIfDuplicate({ table: 'sas_screens', column: 'name' })
  @IsNotEmpty()
  @IsString()
  @MaxLength(30)
  name: string;

  @IsNotEmpty()
  @IsString()
  @MaxLength(255)
  description: string;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => EndpointDto)
  endPoints: EndpointDto[];
}
