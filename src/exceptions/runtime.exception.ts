import { HttpException, HttpStatus } from '@nestjs/common';

export class RuntimeException extends HttpException {
  constructor(status: HttpStatus, message: string) {
    super(message, status);
  }
}
