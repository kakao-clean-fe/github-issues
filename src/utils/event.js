import {filterByStatus} from './status';
import {setListTemplate} from './template';

export const setEventListerElement = (issues) => {
  const statusBtns = document.querySelectorAll('.statusTab>div');
  statusBtns.forEach(statusBtn => {
    statusBtn.addEventListener('click', async(e) => {
      // close 버튼인 경우
      const status = e.target.classList.contains('close-count') ? 'close' : 'open';
      const newIssues = await filterByStatus(issues, status);
      setListTemplate(newIssues);
    })
  });
}