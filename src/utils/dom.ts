
export const findElement = ({ fromElement = document, selector }: { fromElement?: Element | Documnet, selector: string }): Element | null => {
  return fromElement.querySelector(selector);
};
