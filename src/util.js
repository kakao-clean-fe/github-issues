import {getIssueItemTpl} from "./tpl.js";

/* fetch-function */
export const fetchIssueData = async () => await ((await fetch("../data-sources/issues.json")).json());

/* util-function */
export const getIssueTplStr = (issues) => issues.reduce((tplStr, issues) => tplStr + getIssueItemTpl(issues), '');

export const filterIssueByStatus = (issues, status) => issues.filter((issue) => issue.status === status);
