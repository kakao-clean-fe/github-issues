
export const findElement = ({ fromElement = document, selector }: { fromElement?: Element | Document, selector: string }): Element | null => {
  return fromElement.querySelector(selector);
};

export const renderInnerHtml = ({ parent, html }: { parent: Element | null, html: string }): void => {
  if (parent != null) {
    parent.innerHTML = html;
  }
};
