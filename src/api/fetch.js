import { asyncPipe } from "../helpers/fp-helpers.js";

export const fetchIssues = asyncPipe(
  () => fetch("data-sources/issues.json"),
  (res) => res.json()
);

const Method = { GET: "GET", POST: "POST", PUT: "PUT", DELETE: "DELETE" };

class Api {
  async #sendRequest(method, url, req = undefined) {
    try {
      const res = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
        },
        body: req ? JSON.stringify(req) : undefined,
      });
      const parsedRes = await res.json();
      if (parsedRes.error) throw parsedRes;
      return parsedRes;
    } catch (e) {
      this.errorHandler(e);
    }
  }
  get(url) {
    return this.#sendRequest(Method.GET, url);
  }
  post(url, req) {
    console.log(url, req);
    return this.#sendRequest(Method.POST, url, req);
  }
  put(url, req) {
    return this.#sendRequest(Method.PUT, url, req);
  }
  delete(url) {
    return this.#sendRequest(Method.DELETE, url, req);
  }
  errorHandler(e) {
    if (e.status && e.status !== 200) {
      console.error("Fetch Error: ", e.message);
    }
    if (e.error) {
      console.error(e.error);
    }
    console.error("Unknown Error");
  }
}

class ApiWithAbortController extends Api {
  controllerMap = new Map();
  #makeApiId(method, url) {
    return method + url;
  }
  async #sendRequest(method, url, req = undefined) {
    const apiId = this.#makeApiId(method, url);
    if (this.controllerMap.has(apiId)) this.controllerMap.get(apiId).abort();
    const controller = new AbortController();
    this.controllerMap.set(apiId, controller);

    try {
      const res = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
        },
        body: req ? JSON.stringify(req) : undefined,
        signal: controller.signal,
      });
      const parsedRes = await res.json();
      if (parsedRes.error) throw parsedRes;
      return parsedRes;
    } catch (e) {
      this.errorHandler(e);
    } finally {
      this.controllerMap.delete(apiId);
    }
    return;
  }
}

const api = new Api();
const apiWithAbortController = new ApiWithAbortController();

export const LabelApi = {
  getLabels: () => api.get("/labels"),
  getLabelsWithDelay: () => apiWithAbortController.get("/labels-delay"),
  postNewLabel: (newLabelReq) => api.post("/labels", newLabelReq),
};
