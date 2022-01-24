import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
  Logger,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Response } from 'src/types/response.dto';

@Injectable()
export class WrapInterceptor<T> implements NestInterceptor<T, Response<T>> {
  intercept(
    context: ExecutionContext,
    next: CallHandler,
  ): Observable<Response<T>> {
    Logger.log('inside interceptor');
    const statusCode = context.switchToHttp().getResponse().statusCode;
    return next.handle().pipe(map((data) => ({ statusCode, data })));
  }
}
