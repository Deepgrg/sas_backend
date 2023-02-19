import { IsNumber, IsString } from 'class-validator';

export class EndpointDto {
  @IsNumber()
  privilegeId: number;

  @IsString()
  url: string;
}

export interface IFindScreenPrivilegeMapping {
  screenId: number;

  privilegeId: number;
}
