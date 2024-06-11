import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
  Logger,
} from '@nestjs/common';
import { ServiceException } from '../exceptions/serviceException';
import type { Request, Response } from 'express';

type ExceptionResponseBody = {
  message: string;
  path: string;
};

@Catch(Error)
export class ServiceExceptionFilter implements ExceptionFilter {
  private log: Logger = new Logger(ServiceException.name);
  private _request: Request;
  private _response: Response;
  private _exception: HttpException;

  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();

    this.setRequest(request);
    this.setResponse(response);
    this.setException(exception);

    this.logException();
    this.handleException();
  }

  private setRequest(request: Request) {
    this._request = request;
  }

  private setResponse(response: Response) {
    this._response = response;
  }

  private setException(exception: HttpException) {
    this._exception = exception;
  }

  private logException() {
    this.log.error(this._exception.stack);
  }

  private handleException() {
    switch (this._exception.constructor) {
      case ServiceException:
        return this.handleServiceException();
      default:
        return this.handleUnknownException();
    }
  }

  private handleServiceException() {
    const serviceException = this._exception as ServiceException;

    if (serviceException.error === undefined) {
      throw new Error('ServiceException must have a BaseError object');
    }

    return this._response.status(serviceException.error.status).json({
      message: serviceException.error.message,
      path: this._request.url,
    } as ExceptionResponseBody);
  }

  private handleUnknownException() {
    return this._response.status(500).json({
      message: 'Internal Server Error',
      path: this._request.url,
    } as ExceptionResponseBody);
  }
}
