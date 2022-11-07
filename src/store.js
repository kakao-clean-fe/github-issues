import { ISSUE_STATUS } from "./constant";

let state = {
  issues: [],
  labels: [],
  selectedStatus: ISSUE_STATUS.OPEN,
};

let listeners = [];
const removeChangeListener = (listener) => listeners.filter(li !== listener);
const addChangeListener = (...listener) => {
  const listenerPipe = pipe(...listener);
  listenerPipe(state);
  listeners.push(listenerPipe);
  return () => removeChangeListener(listenerPipe);
};

const emmitChanges = () => {
  listeners.forEach((li) => li(state));
};

const setState = (newState) => {
  state = newState;
  emmitChanges();
};
const getState = () => state;

const fetchBody = (url) => fetch(url).then((response) => response.json());
const initState = async () => {
  const [issues, labels] = await Promise.all([
    fetchBody("/data-sources/issues.json"),
    fetchBody("/data-sources/labels.json"),
  ]);
  setState({
    ...state,
    issues,
    labels,
  });
};

initState();

const pipe = (...fns) => {
  return (args) =>
    fns.reduce((acc, fn) => {
      return fn(acc);
    }, args);
};

const selectIssues = () => getState().issues;
const selectOpenIssues = () =>
  selectIssues().filter((issue) => issue.status === ISSUE_STATUS.OPEN);
const selectCloseIssues = () =>
  selectIssues().filter((issue) => issue.status === ISSUE_STATUS.CLOSE);

const selectCurrentIssues = () =>
  selectIssues().filter((issue) => issue.status === state.selectedStatus);

const selectSelectedStatus = () => getState().selectedStatus;

export default {
  addChangeListener,
  selectOpenIssues,
  selectCloseIssues,
  selectCurrentIssues,
  selectSelectedStatus,
  getState,
  setState,
};
