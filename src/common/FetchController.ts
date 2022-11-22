import { API_METHOD } from './constants';
import { Api } from '../../types';
import { removeUndefinedParam } from './util';
import { Logger } from '../common/decorator';

class FetchController {
  static interceptor = (res: any) => {};
  @Logger.errorLogger()
  static errorHandler(error: Error) {}
  static requestList: {
    fetchId: number;
    url: string;
    method: string;
    abortController: AbortController;
  }[] = [];

  constructor() {}
  @Logger.fetchLogger({ fetchingTimeLogging: true })
  static async fetch<T = any>(
    { url, method, body, errorMessage }: Api,
    abortControl?: boolean
  ): Promise<T> {
    const fetchId = new Date().getTime();
    try {
      const request = FetchController.requestList.find(
        (request) => request.url === url && request.method === method
      );
      const abortController = new AbortController();

      if (request) {
        request.abortController.abort();
        request.abortController = abortController;
      }
      FetchController.requestList.push({
        fetchId,
        url,
        abortController,
        method,
      });
      const res = await fetch(
        url,
        removeUndefinedParam({
          method,
          body,
          signal: abortControl ? abortController.signal : undefined,
        })
      );
      FetchController.interceptor(res);
      const json = await res.json();
      return json;
    } catch (error) {
      if (FetchController.errorHandler !== null) {
        FetchController.errorHandler(error);
      }
    } finally {
      FetchController.requestList = FetchController.requestList.filter(
        (request) => request.fetchId !== fetchId
      );
    }
  }
}

export default FetchController;
