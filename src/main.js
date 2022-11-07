import {getFetchData} from './api';
import {IssuesData} from './stores/issue';
import {setDefaultTemplate, setListTemplate} from './utils/template';
import {getStatusCount} from './utils/status';
import {setEventListerElement} from './utils/event';
import {pipe} from './utils/pipe';

const main = async () => {
  const issuesData = IssuesData();
  issuesData.setIssues(await getFetchData('issues'));
  const issues = issuesData.getIssues();
  pipe(getStatusCount, setDefaultTemplate)(issues);
  setEventListerElement(issues);
  setListTemplate(issues);
}

main();