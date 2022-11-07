
export const findElement = ({ fromElement = document, selector }: { fromElement?: Element | Document, selector: string }): Element | null => {
  return fromElement.querySelector(selector);
};
