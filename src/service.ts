export async function fetchIssues() {
  const response = await fetch('/data-sources/issues.json');
  return response.json();
}
  
export async function fetchLabels() {
  const response = await fetch('/data-sources/labels.json');
  return response.json();
}
  