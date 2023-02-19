import { ValidateIfExists } from '@decorators/validation.decorator';
import { IsNotEmpty, IsNumber, IsInt, IsEnum } from 'class-validator';

export enum EAccessUpdateAction {
  CREATE = 'CREATE',
  DELETE = 'DELETE',
}

export class UpdateAccessDto {
  @ValidateIfExists({ table: 'sas_roles', column: 'id' })
  @IsNotEmpty()
  @IsNumber()
  @IsInt()
  roleId: number;

  @ValidateIfExists({ table: 'sas_screens', column: 'id' })
  @IsNotEmpty()
  @IsNumber()
  @IsInt()
  screenId: number;

  @ValidateIfExists({ table: 'sas_privileges', column: 'id' })
  @IsNotEmpty()
  @IsNumber()
  @IsInt()
  privilegeId: number;

  @IsNotEmpty()
  @IsEnum(EAccessUpdateAction)
  action: EAccessUpdateAction;
}
