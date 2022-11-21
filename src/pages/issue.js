import {getFetchData} from '../api';
import {IssuesData} from '../stores/issue';
import {setDefaultTemplate, setListTemplate} from '../utils/template';
import {getStatusCount} from '../utils/status';
import {setEventListerElement} from '../utils/event';
import {pipe} from '../utils/pipe';

export const issuePage = async () => {
  const issuesData = IssuesData();
  const issues = await getFetchData('issues');
  issuesData.setIssues(issues);
  pipe(getStatusCount, setDefaultTemplate)(issues);
  setEventListerElement(issues);
  setListTemplate(issues);
};