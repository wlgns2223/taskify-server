import { HttpStatus } from '@nestjs/common';

/**
 * 블로그 참고할때에는 Exception이 프로토콜과 관계 없이 사용하도록 Error 클래스를 상속받도록 했지만
 * 나는 학습목적이므로 HttpException을 상속받도록 했다.
 * 현재 내가 하려는 프로젝트에서는 HTTP 프로토콜만을 사용한다.
 */

/**
 * service layer에서 에러를 던지는데 일반적으로는 http에 종속되지 않는 에러를 던져야한다.
 * 하지만 나는 학습목적의 사이드 프로젝트이므로 http 에러를 던진다.
 * 일단 완성하는게 중요하다.
 */

export class BaseError {
  protected _message: string;
  protected _status: HttpStatus;

  constructor(message: string, status: HttpStatus) {
    this._message = message;
    this._status = status;
  }

  set message(message: string) {
    this._message = message;
  }

  get message() {
    return this._message;
  }

  get status() {
    return this._status;
  }
}
