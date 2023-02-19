import { ValidateIfExists } from '@decorators/validation.decorator';
import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsInt, IsNotEmpty, IsNumber } from 'class-validator';

export class UserRoleMappingDto {
  @ApiProperty({ type: [Number] })
  @IsArray({})
  @IsNumber({}, { each: true })
  roleIds: number[];

  @ValidateIfExists({ table: 'sas_users', column: 'id' })
  @IsNotEmpty()
  @IsInt()
  userId: number;
}
