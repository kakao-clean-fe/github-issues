import {
  ISSUE_SELECTOR,
  LABEL_SELECTOR,
} from './const.js';
import {createIssueTab, createLabelTab} from "./handlers.js";
import store, {ISSUE_TAB, LABEL_TAB} from './store';

// entrypoint
window.addEventListener('DOMContentLoaded', function () {
  store.subscribe((prevState, state, action) => {
    if (action.type === ISSUE_TAB) {
      createIssueTab();
    } else if (action.type === LABEL_TAB) {
      createLabelTab();
    }
  });

  const issue = document.querySelector(ISSUE_SELECTOR);
  const label = document.querySelector(LABEL_SELECTOR);

  issue.addEventListener('click', () => {
    store.dispatch({type: ISSUE_TAB});
  });

  label.addEventListener('click', () => {
    store.dispatch({type: LABEL_TAB});
  });

  // 처음에는 이슈 탭을 default로 보여준다.
  store.dispatch({
    type: ISSUE_TAB
  });
});
