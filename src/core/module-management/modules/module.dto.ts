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

export class CreateModuleDto {
  @ValidateIfDuplicate({ table: 'sas_modules', column: 'name' })
  @IsNotEmpty()
  @IsString()
  @MaxLength(30)
  name: string;

  @IsNotEmpty()
  @IsString()
  @MaxLength(255)
  description: string;
}

export class UpdateModuleDto {
  @ValidateIfExists({ table: 'sas_modules', column: 'id' })
  @IsNotEmpty()
  @IsNumber()
  @IsInt()
  id: number;

  @ValidateIfDuplicate({ table: 'sas_modules', column: 'name' })
  @IsNotEmpty()
  @IsString()
  @MaxLength(30)
  name: string;

  @IsNotEmpty()
  @IsString()
  @MaxLength(255)
  description: string;
}
