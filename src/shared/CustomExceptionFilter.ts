import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  HttpStatus,
  BadRequestException,
  NotFoundException,
} from '@nestjs/common';
import { HttpAdapterHost } from '@nestjs/core';
import { ValidationException } from './errors';

@Catch()
export class AllExceptionsFilter implements ExceptionFilter {
  constructor(private readonly httpAdapterHost: HttpAdapterHost) {}

  getHttpStatusCode(ex: any) {
    if (ex instanceof HttpException) return ex.getStatus();
    if (ex instanceof ValidationException) return 400;
    return HttpStatus.INTERNAL_SERVER_ERROR;
  }

  getHttpMessages(ex: any) {
    if (ex instanceof HttpException) {
      const r: any = (ex as HttpException).getResponse();
      return r.message;
    }
    if (ex instanceof ValidationException) {
      return [ex.message];
    }
    if ('statusCode' in ex) {
      return [ex.message];
    }
    return ['Internal server error'];
  }

  getCodeIfExists(ex: any) {
    if (ex instanceof NotFoundException) return 'NOT_FOUND';
    if ('response' in ex) return ex.response?.statusCode;
    if ('getCode' in ex) return ex.getCode();
    return 'code' in ex ? ex.getCode : undefined;
  }

  catch(exception: unknown, host: ArgumentsHost): void {
    const { httpAdapter } = this.httpAdapterHost;
    const ctx = host.switchToHttp();
    const httpStatus = this.getHttpStatusCode(exception);
    console.error(exception);
    const responseBody = {
      statusCode: httpStatus,
      timestamp: new Date().toISOString(),
      code: this.getCodeIfExists(exception),
      messages: this.getHttpMessages(exception),
      path: httpAdapter.getRequestUrl(ctx.getRequest()),
    };
    httpAdapter.reply(ctx.getResponse(), responseBody, httpStatus);
  }
}
