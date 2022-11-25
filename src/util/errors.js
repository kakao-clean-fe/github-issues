import { HTTP_ERROR } from "../const";

/**
 * throw 인수에는 제약이 없기 때문에 Error를 상속하지 않아도 된다
 */
export class HttpError extends Error {
  constructor({message, statusCode}) {
    super(message);
    this.name = HTTP_ERROR;
    this.statusCode = statusCode;
  }
}