import {getIssueTpl, getIssueItemTpl} from './tpl';

const IssuesCloser = ()=> {
  let issues = null;
  return {
    getIssues: function () {
      return issues;
    },
    setIssues: function (_issues) {
      issues = _issues;
    },
  };
}

const getFetchData = async (url) => {
  try{
    const response = await fetch(url);
    return await response.json();
  } catch(e){
    console.log(e);
  }
  return;
}

const getStatusCount = async (status) => {
  const data = issuesCloser.getIssues();
  return data.reduce((count, currValue) => count + (currValue.status === status ? 1 : 0), 0);
}

const filterByStatus = async (data, status) => {
  return data.filter(item => item.status === status);
}

const setDefaultTemplate = (openCount, closeCount) => {
  const htmlData = getIssueTpl(openCount, closeCount);
  const appElement = document.querySelector('#app');
  appElement.innerHTML = htmlData;
}

const setEventListerElement = () => {
  const statusBtns = document.querySelectorAll('.statusTab>div');
  const issues = issuesCloser.getIssues();
  statusBtns.forEach(statusBtn => {
    statusBtn.addEventListener('click', async(e) => {
      // close 버튼인 경우
      const status = e.target.classList.contains('close-count') ? 'close' : 'open';
      const newIssues = await filterByStatus(issues, status);
      setListTemplate(newIssues);
    })

  });
}

const setListTemplate = (issues) => {
  const ULElement = document.querySelector('.issue-list>ul');
  let innerHTML = '';
  issues.forEach(issue => {
    innerHTML += getIssueItemTpl(issue);
  });
  ULElement.innerHTML = innerHTML;
}

const issuesCloser = IssuesCloser();
const main = async () => {
  issuesCloser.setIssues(await getFetchData('../data-sources/issues.json'));
  const openCount = await getStatusCount('open');
  const closeCount = await getStatusCount('close');
  setDefaultTemplate(openCount, closeCount);
  setEventListerElement();
  const issues = issuesCloser.getIssues();
  setListTemplate(issues);
}

main();