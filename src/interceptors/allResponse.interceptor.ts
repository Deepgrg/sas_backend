/*
 * @Author: prashant.chaudhary
 * @Date: 2022-11-21 18:20:42
 * @Last Modified by: dipsagun.gurung
 * @Last Modified time: 2022-12-26 15:57:40
 */

import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
  HttpStatus,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { ISuccesResponse } from '@utils/response/response.interface';
import * as util from 'util';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

export interface Response<T> {
  data: T;
}

@Injectable()
export class AllResponseInterceptor<T>
  implements NestInterceptor<T, Response<T>>
{
  constructor(private reflector: Reflector) {}
  async intercept(
    context: ExecutionContext,
    next: CallHandler,
  ): Promise<Observable<Response<T>>> {
    const message = this.reflector.get<string>('message', context.getHandler());
    const source = this.reflector.get<string>('source', context.getHandler());
    return next.handle().pipe(
      map((data) => {
        if (data === undefined) {
          data = null;
        }
        const success: ISuccesResponse = {
          success: true,
          status: HttpStatus.OK,
          message: util.format(message, source),
          data: data,
        };
        if (context.getType() === 'http') {
          return success;
        }
      }),
    );
  }
}
