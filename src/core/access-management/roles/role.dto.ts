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

export class CreateRoleDto {
  @ValidateIfDuplicate({ table: 'sas_roles', column: 'name' })
  @IsNotEmpty()
  @IsString()
  @MaxLength(30)
  name: string;

  @IsNotEmpty()
  @IsString()
  @MaxLength(255)
  description: string;
}

export class UpdateRoleDto {
  @ValidateIfExists({ table: 'sas_roles', column: 'id' })
  @IsNotEmpty()
  @IsNumber()
  @IsInt()
  id: number;

  @ValidateIfDuplicate({ table: 'sas_roles', column: 'name' })
  @IsNotEmpty()
  @IsString()
  @MaxLength(30)
  name: string;

  @IsNotEmpty()
  @IsString()
  @MaxLength(255)
  description: string;
}
