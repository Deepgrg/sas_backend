import { HttpStatus } from '@nestjs/common';

export interface ISuccesResponse {
  success: true;
  status: HttpStatus;
  message: string;
  data: any;
}

export interface IErrorResponse {
  success: false;
  status: HttpStatus;
  message: string;
  data: any;
}
