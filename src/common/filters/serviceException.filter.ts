import { ArgumentsHost, Catch, ExceptionFilter, HttpException, Logger } from '@nestjs/common';
import { ServiceException } from '../exceptions/serviceException';
import type { Request, Response } from 'express';
import { AuthServiceException } from '../exceptions/auth.exception';

type ExceptionResponseBody = {
  message: string;
  path: string;
};

@Catch(Error)
export class ServiceExceptionFilter implements ExceptionFilter {
  private log: Logger = new Logger(ServiceException.name);
  private _request: Request;
  private _response: Response;
  private _exception: ServiceException;

  catch(exception: ServiceException, host: ArgumentsHost) {
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

  private setException(exception: ServiceException) {
    this._exception = exception;
  }

  private logException() {
    this.log.error(this._exception.stack);
  }

  private handleException() {
    switch (this._exception.constructor) {
      case ServiceException:
        return this.handleServiceException();
      case AuthServiceException:
        return this.handleAuthServiceException();
      default:
        return this.handleUnknownException();
    }
  }

  private handleAuthServiceException() {
    if (!(this._exception instanceof AuthServiceException)) {
      return this.handleUnknownException();
    }

    const authError = this._exception.error;
    const tokenType = authError.tokenType;
    const realm = tokenType === 'access' ? 'ACCESS_TOKEN' : 'REFRESH_TOKEN';
    const headerName = 'WWW-Authenticate';
    const headerBody = `Bearer realm=${realm};error=${
      this._exception.message
    },errorDescription=${JSON.stringify(this._exception.cause)}`;

    const body: ExceptionResponseBody = {
      message: this._exception.error.message,
      path: this._request.url,
    };

    return this._response.status(this._exception.error.status).header(headerName, headerBody).json(body);
  }

  private handleServiceException() {
    if (!(this._exception instanceof ServiceException)) {
      return this.handleUnknownException();
    }
    const serviceException = this._exception;

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
