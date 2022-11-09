import { fetchIssues } from "./service";
import { getIssueTpl, getIssueItemTpl } from "./tpl";
import { selector as sel, STATUS } from "./constant";
import { Status, Issue } from "../types";

const issues = await fetchIssues()

const $app = document.querySelector(sel.app)!
$app.innerHTML = getIssueTpl()

const $issueList = document.querySelector(sel.issueList)!

$issueList.innerHTML = issues
  .filter((issue: Issue) => issue.status === "open")
  .map((issue: Issue) => getIssueItemTpl(issue))
  .join('')

const getBtn = (status: Status) => document.querySelector(`.${status}-count`)

function isOpenedIssue(issue: Issue) {
  return issue.status === 'open';
}

function isClosedIssue(issue: Issue) {
  return issue.status === 'close';
}

const $openBtn = getBtn('open')!
$openBtn.innerHTML = `${issues.filter(isOpenedIssue).length} opens`
const $closeBtn = getBtn('close')!
$closeBtn.innerHTML = `${issues.filter(isClosedIssue).length} closed`

$openBtn.addEventListener('click', () => {
  $issueList.innerHTML = issues
  .filter(isOpenedIssue)
  .map(getIssueItemTpl)
  .join('')
  $openBtn.classList.add('font-bold')
  $closeBtn.classList.remove('font-bold')
})

$closeBtn.addEventListener('click', () => {
  $issueList.innerHTML = issues
  .filter(isClosedIssue)
  .map(getIssueItemTpl)
  .join('')
  $openBtn.classList.remove('font-bold')
  $closeBtn.classList.add('font-bold')
})

/*
TODO
1. type 추가
2. 함수 쪼개기
3. 고차함수 적용 -> 커링까지 목표
*/