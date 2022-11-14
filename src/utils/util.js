import {getIssueItemTpl} from "../tpl.js";

export const getIssueTplStr = (issues) => issues.reduce((tplStr, issues) => tplStr + getIssueItemTpl(issues), '');

export const filterIssueByStatus = (issues, status) => issues.filter((issue) => issue.status === status);

export const getRandomColor = () => `#${Math.floor(Math.random() * 16777215).toString(16)}`;

