import { NAVIGATION } from '~/constants/selector';
import { getElement } from '~/store/element-store';
import { addClickEventListener } from '~/utils/dom';
import { router } from '~/utils/router';

const $issueButton = getElement({ selector: NAVIGATION.ISSUE_BUTTON });
const $labelButton = getElement({ selector: NAVIGATION.LABEL_BUTTON });

const addIssueButtonHandler = (): void => {
  const eventHandler = () => {
    router.move({ path: '/issue' });
  };

  addClickEventListener({
    element: $issueButton,
    eventHandler
  });
};

const addLabelButtonHandler = (): void => {
  const eventHandler = () => {
    router.move('/label');
  };

  addClickEventListener({
    element: $labelButton,
    eventHandler
  });
};

const initEventHandler = (): void => {
  addIssueButtonHandler();
  addLabelButtonHandler();
};

export const initNavigationBar = (): void => {
  initEventHandler();
};
