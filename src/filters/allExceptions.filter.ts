import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  HttpStatus,
  BadRequestException,
  UnauthorizedException,
} from '@nestjs/common';
import { HttpAdapterHost } from '@nestjs/core';
import { IErrorResponse } from '@utils/response/response.interface';

@Catch()
export class AllExceptionsFilter implements ExceptionFilter {
  constructor(private readonly httpAdapterHost: HttpAdapterHost) {}

  catch(exception: unknown, host: ArgumentsHost): void {
    // In certain situations `httpAdapter` might not be available in the
    // constructor method, thus we should resolve it here.
    const { httpAdapter } = this.httpAdapterHost;
    const ctx = host.switchToHttp();

    const responseBody: IErrorResponse = {
      success: false,
      status: HttpStatus.INTERNAL_SERVER_ERROR,
      message: 'Internal Server Error',
      data: null,
    };

    if (exception instanceof HttpException) {
      responseBody.status = exception.getStatus();
      responseBody.message = exception.message;
    }

    if (exception instanceof BadRequestException) {
      responseBody.status = exception.getStatus();
      const rawResponse: any = exception.getResponse();
      const rawMessages = rawResponse?.message;
      let processedMessage = '';
      if (rawMessages && Array.isArray(rawMessages)) {
        rawMessages.map((item, index) => {
          const serialNumber = index + 1;
          processedMessage += `${serialNumber}. ${item} `;
        });
        responseBody.message = processedMessage;
      }
    }

    if (exception instanceof UnauthorizedException) {
      responseBody.status = exception.getStatus();
      responseBody.message = exception.message;
    }

    if (
      process.env.NODE_ENV === 'local' ||
      process.env.NODE_ENV === 'development'
    ) {
      console.log(exception);
      console.log(responseBody);
    }

    httpAdapter.reply(ctx.getResponse(), responseBody, responseBody.status);
  }
}
