import {getIssueItemTpl} from "./tpl.js";

/* fetch-function */
export const fetchIssueData = async () => await ((await fetch("../data-sources/issues.json")).json());

/* util-function */
export const getIssueTplStr = (issues) => issues.reduce((tplStr, issues) => tplStr + getIssueItemTpl(issues), '');

export const filterIssueByStatus = (issues, status) => issues.filter((issue) => issue.status === status);

export const pipe = (...fns) => (...args) => fns.reduce((result, fn) => fn.length === 1 ? fn(result) : fn.apply(undefined, result), args);
