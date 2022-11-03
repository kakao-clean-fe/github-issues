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

document.getElementById('app').innerHTML = getIssueTpl();
fetchIssues().then(issues => {
    console.log(issues);
    issues.forEach(renderIssueItemElement);
});
