
interface AbortFetchController {
  _controllerMap: Map<string, AbortController>
  create: (key: string) => AbortController
  abort: (key: string) => void
  has: (key: string) => boolean
  cancelPendingRequest: (key: string) => void
}

export const abortFetchController: AbortFetchController = {
  _controllerMap: new Map(),
  create (this: AbortFetchController, key: string) {
    const abortController = new AbortController();
    this._controllerMap.set(key, abortController);

    return abortController;
  },
  abort (this: AbortFetchController, key: string) {
    const controller = this._controllerMap.get(key);
    controller?.abort();
  },
  has (this: AbortFetchController, key: string) {
    return this._controllerMap.has(key);
  },
  cancelPendingRequest (this: AbortFetchController, key: string) {
    if (!this.has(key)) {
      return;
    }
    this.abort(key);
  }
};
