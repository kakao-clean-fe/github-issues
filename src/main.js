import { IssuePageinit } from "./Issue/index.js";
import { LabelPageInit } from "./Label/index.js";
import { worker } from './mocks/browser';

const evtIssueTabClick = () => {
  IssuePageinit();
};

const evtLabelTabClick = () => {
  LabelPageInit();
};

window.onload = () => {
  // Running Mock Server
  worker.start();

  // Running Front App
  document.querySelector('.issue-tab').addEventListener('click', evtIssueTabClick)
  document.querySelector('.label-tab').addEventListener('click', evtLabelTabClick)
  
  IssuePageinit();
};