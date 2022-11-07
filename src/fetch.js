import {asyncPipe} from "./fp-helpers.js";

const fetchLabels = asyncPipe(
  () => fetch('/data-sources/labels.json'),
  res => res.json()
);
export const fetchIssues = asyncPipe(
  () => fetch('data-sources/issues.json'),
  res => res.json()
);
