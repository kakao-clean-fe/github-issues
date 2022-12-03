import { initLabelPage } from '~/pages/label-page';
import { initIssuePage } from '~/pages/issue-page';
import { router } from '~/utils/router';
import { init404Page } from '~/pages/404page';

export const renderByPath = () => {
  const path = router.getPath();

  switch (path) {
    case '/':
    case '/label':{
      initLabelPage();
      break;
    }
    case '/issue': {
      initIssuePage();
      break;
    }
    default: {
      init404Page();
    }
  }
};
