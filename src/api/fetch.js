import {asyncPipe} from "../helpers/fp-helpers.js";

export const fetchLabels = asyncPipe(
  () => fetch('/data-sources/labels.json'),
  res => res.json()
);
export const fetchIssues = asyncPipe(
  () => fetch('data-sources/issues.json'),
  res => res.json()
);
