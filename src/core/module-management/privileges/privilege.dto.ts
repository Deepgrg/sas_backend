import { ToUpperCase } from '@decorators/input.decorator';
import {
  ValidateIfDuplicate,
  ValidateIfExists,
} from '@decorators/validation.decorator';
import {
  IsNotEmpty,
  IsString,
  MaxLength,
  IsNumber,
  IsInt,
} from 'class-validator';

export class CreatePrivilegeDto {
  @ValidateIfDuplicate({ table: 'sas_privileges', column: 'name' })
  @IsNotEmpty()
  @IsString()
  @MaxLength(30)
  name: string;

  @IsNotEmpty()
  @IsString()
  @MaxLength(255)
  description: string;

  @ValidateIfDuplicate({ table: 'sas_privileges', column: 'method' })
  @IsNotEmpty()
  @IsString()
  @MaxLength(30)
  @ToUpperCase()
  method: string;
}
export class UpdatePrivilegeDto {
  @ValidateIfExists({ table: 'sas_privileges', column: 'id' })
  @IsNotEmpty()
  @IsNumber()
  @IsInt()
  id: number;

  @ValidateIfDuplicate({ table: 'sas_privileges', column: 'name' })
  @IsNotEmpty()
  @IsString()
  @MaxLength(30)
  name: string;

  @IsNotEmpty()
  @IsString()
  @MaxLength(255)
  description: string;

  @ValidateIfDuplicate({ table: 'sas_privileges', column: 'method' })
  @IsNotEmpty()
  @IsString()
  @MaxLength(30)
  @ToUpperCase()
  method: string;
}
