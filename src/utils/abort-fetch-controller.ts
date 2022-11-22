
interface AbortFetchController {
  _controllerWeakMap: Map<string, AbortController>
  create: (key: string) => AbortFetchController
  abort: (key: string) => void
  has: (key: string) => boolean
  getSignal: (key: string) => AbortSignal | undefined
}

export const abortFetchController: AbortFetchController = {
  _controllerWeakMap: new Map(),
  create (this: AbortFetchController, key: string): typeof abortFetchController {
    this._controllerWeakMap.set(key, new AbortController());
    return this;
  },
  abort (this: AbortFetchController, key: string) {
    const controller = this._controllerWeakMap.get(key);
    controller?.abort();
  },
  has (this: AbortFetchController, key: string) {
    return this._controllerWeakMap.has(key);
  },
  getSignal (this: AbortFetchController, key: string) {
    return this._controllerWeakMap.get(key)?.signal;
  }
};
