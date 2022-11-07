import {filterByStatus} from './status';
import {setListTemplate, setButtonTemplate} from './template';

export const setEventListerElement = (issues) => {
  const statusButtons = document.querySelectorAll('.statusTab>div');
  // 버튼 class 초기화
  setButtonTemplate(statusButtons);
  statusButtons.forEach(statusBtn => {
    statusBtn.addEventListener('click', async(e) => {
      // close 버튼인 경우
      const status = e.target.classList.contains('close-count') ? 'close' : 'open';
      const newIssues = await filterByStatus(issues, status);
      setButtonTemplate(statusButtons, e.target);
      setListTemplate(newIssues);
    })
  });
}
