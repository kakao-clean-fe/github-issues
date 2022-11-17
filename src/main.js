import { IssuePageinit } from "./Issue/index.js";
import { LabelPageInit } from "./Label/index.js";

const evtIssueTabClick = () => {
  IssuePageinit();
};

const evtLabelTabClick = () => {
  LabelPageInit();
};

document.querySelector('.issue-tab').addEventListener('click', evtIssueTabClick)
document.querySelector('.label-tab').addEventListener('click', evtLabelTabClick)

IssuePageinit();