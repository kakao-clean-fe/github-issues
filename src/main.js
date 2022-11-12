import { getIssuesData } from "./handler.js";
import {
  getIssueTpl,
  getIssueItemTpl,
  getLabelTpl,
  getLabelItemTpl,
} from "./tpl.js";

document.querySelector("#app").innerHTML = getIssueTpl();

document.querySelector("#app").innerHTML += getIssueItemTpl(getIssuesData());