import type { FindElementArgs, RenderInnerHtmlArgs, FindParentAndRenderInnerHtmlArgs } from '~/types/utils/dom';
export const findElement = ({ fromElement = document, selector }: FindElementArgs): Element | null => {
  return fromElement.querySelector(selector);
};

export const renderInnerHtml = ({ parent, html }: RenderInnerHtmlArgs): void => {
  if (parent != null) {
    parent.innerHTML = html;
  }
};

export const findParentAndRenderInnerHtml = ({ fromElement, selector, html }: FindParentAndRenderInnerHtmlArgs): void => {
  renderInnerHtml({
    parent: findElement({ fromElement, selector }),
    html
  });
};
