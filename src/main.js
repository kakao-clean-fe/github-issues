import {getIssueItemTpl, getIssueTpl} from "./tpl.js";

function fetchLabels() {
    return fetch('/data-sources/labels.json').then(res => res.json());
}
function fetchIssues() {
    return fetch('/data-sources/issues.json').then(res => res.json());
}

function htmlToElement(html) {
    const template = document.createElement('template');
    html = html.trim();
    template.innerHTML = html;
    return template.content.firstChild;
}

function renderIssueItemElement(issue) {
    const newIssueItemElement = htmlToElement(getIssueItemTpl(issue));
    document.querySelector('.issue-list ul').appendChild(newIssueItemElement);
}

function renderStatusNum(allIssueNum, openedNum) {
    document.getElementsByClassName('open-count')[0].innerText = openedNum + ' Opened';
    document.getElementsByClassName('close-count')[0].innerText = (allIssueNum - openedNum) + ' Closed';
}

document.getElementById('app').innerHTML = getIssueTpl();
fetchIssues().then(issues => {
    issues.forEach(renderIssueItemElement);
    renderStatusNum(issues.length, issues.filter(({status}) => status === "open").length);
});

