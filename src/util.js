export function isOpenedIssue(issue) {
  return issue.status === 'open';
}

export function isClosedIssue(issue) {
  return issue.status === 'close';
}
