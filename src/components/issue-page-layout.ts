import { getIssueTpl } from '~/tpl.js';
import { findParentAndRenderInnerHtml } from '~/utils/dom';

const render = ({ parentSelector }: { parentSelector: string }): void => {
  findParentAndRenderInnerHtml({
    selector: parentSelector,
    html: getIssueTpl()
  });
};

export const IssuePageLayout = ({ parentSelector }: { parentSelector: string }): void => {
  render({ parentSelector });
};
