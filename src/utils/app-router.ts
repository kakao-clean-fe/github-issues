import { initLabelPage } from '~/pages/label-page';
import { initIssuePage } from '~/pages/issue-page';
import { router } from '~/utils/router';
import { renderInnerHtml } from './dom';
import { getElement } from '~/store/element-store';
import { ROOT_SELECTOR } from '~/constants/selector';

export const renderByPath = () => {
  const path = router.getPath();

  renderInnerHtml({
    parent: getElement({ selector: ROOT_SELECTOR }),
    html: ''
  });

  switch (path) {
    case '/issue': {
      initIssuePage();
      break;
    }
    case '/label': {
      initLabelPage();
      break;
    }
    default: {
      alert('404 page');
    }
  }
};
