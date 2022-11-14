export default class ClassWrapper {
  #element: Element;
  #observer: MutationObserver;
  constructor(element?: Element, callback?: MutationCallback) {
    if (element) {
      this.#element = element;
    } else {
      this.#element = document.createElement('div');
    }
    this.#observer = new MutationObserver(callback);
    this.#observer.observe(this.#element, {
      attributeOldValue: true,
      attributes: true,
      childList: true,
      characterData: true,
    });
  }
  get element() {
    return this.#element;
  }
}
