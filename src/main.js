import {getFetchData} from './api';
import {IssuesData} from './stores/issue';
import {setDefaultTemplate, setListTemplate} from './utils/template';
import {getStatusCount} from './utils/status';
import {setEventListerElement} from './utils/event';

const main = async () => {
  const issuesData = IssuesData();
  issuesData.setIssues(await getFetchData('issues'));
  const issues = issuesData.getIssues();
  setDefaultTemplate(getStatusCount(issues));
  setEventListerElement(issues);
  setListTemplate(issues);
}

main();