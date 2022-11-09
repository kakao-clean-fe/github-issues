import { querySelectorAll } from './dom-selector';
import {filterByStatus} from './status';
import {setListTemplate, setButtonTemplate} from './template';

export const setEventListerElement = (issues) => {
  const statusButtons = querySelectorAll('.statusTab>div');
  // 버튼 class 초기화
  setButtonTemplate(statusButtons);
  statusButtons.forEach(statusBtn => {
    const statusBtnClickEvt = async(e) => {
      // close 버튼인 경우
      const status = e.target.classList.contains('close-count') ? 'close' : 'open';
      const newIssues = await filterByStatus(issues, status);
      setListTemplate(newIssues);
      setButtonTemplate(statusButtons, e.target);
    }
    statusBtn.addEventListener('click', statusBtnClickEvt);
  });
}
