import { EUserTypes } from '@core/user-management/user/user.enum';

export interface IPayload {
  sub: number;
  userType: EUserTypes;
}
