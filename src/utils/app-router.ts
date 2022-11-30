import { initLabelPage } from '~/pages/label-page';
import { initIssuePage } from '~/pages/issue-page';
import { router } from '~/utils/router';

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
      alert('404 page');
    }
  }
};
