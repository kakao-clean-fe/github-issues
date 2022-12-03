import { ABORT_ERROR, GET, POST } from "../const";
import { AbortControllerManager } from "./abortControllerManager";
import { HttpError } from "./errors";
import { multipleArgsPipe } from "./operator";

class ApiService {
  constructor() {
    this.controller = new AbortControllerManager();
  }

  async get(url, signal) {
    return await fetch(url, {signal});
  }

  async post({url, params, signal}) {
    return fetch(url, {
      method: POST,
      headers: {
        'Content-Type': 'application/json;charset=utf-8'
      },
      body: JSON.stringify(params),
      signal
    });
  }

  async requestWrapper({url, method, params}) {
    const signal = multipleArgsPipe(
      this.controller.getControllerKey,
      (key) => this.controller.getSignal(key)
    )(url, method);

    // 요청
    try {
      const res = method === GET ? await this.get(url, signal) : await this.post({url, params, signal});
  
      if (res.status >= 400) {
        throw new HttpError({
          message: `http 요청 실패, 상태코드: ${res.status}`, 
          statusCode: res.status,
        });
      }

      return res.json();

    } catch(err) {
      if (err.name === ABORT_ERROR) {
        console.log('abort ' + err);
      } else if (err instanceof HttpError) {
        console.log('Http Error ' + err);
      } else {
        console.log('기타 에러 ' + err);
      }

      throw err;
    }
  }

  async getIssues() {
    try {
      return await this.requestWrapper({
        url: '/issues', 
        method: GET, 
      })
    } catch(err) {
      throw err;
    }
  }

  async getLabels() {
    try {
      return await this.requestWrapper({
        url: '/labels', 
        method: GET, 
      })
    } catch(err) {
      throw err;
    }
  }

  async getDelayedLabels() {
    try {
      return await this.requestWrapper({
        url: '/labels-delay', 
        method: GET, 
      })
    } catch(err) {
      throw err;
    }
  }

  async postLabel(params) {
    try {
      return await this.requestWrapper({
        url: '/labels', 
        method: POST, 
        params
      })
    } catch(err) {
      throw err;
    }
  }
}

export const apiService = new ApiService();
