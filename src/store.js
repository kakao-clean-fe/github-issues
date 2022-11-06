import { ISSUE_STATUS } from "./constant";

const initialState = {
  issues: [],
  labels: [],
  selectedStatus: ISSUE_STATUS.OPEN,
};
let listeners = [];
const store = new Proxy(initialState, {
  set(target, p, value) {
    target[p] = value;
    listeners.forEach((li) => li(target));
    return true;
  },
});

const fetchBody = (url) => fetch(url).then((response) => response.json());
const initState = async () => {
  const [issues, labels] = await Promise.all([
    fetchBody("/data-sources/issues.json"),
    fetchBody("/data-sources/labels.json"),
  ]);

  store.issues = issues;
  store.labels = labels;
};

initState();

const pipe = (...fns) => {

  return (args) =>
    fns.reduce((acc, fn) => {
      return fn(acc);
    }, args);
};

const addChangeListener = (...listener) => {
  const listenerPipe = pipe(...listener);
  listenerPipe(store);
  listeners.push(listenerPipe);
  return () => {
    listeners = listeners.filter((li) => li !== listenerPipe);
  };
};

const selectIssues = () => store.issues;
const selectOpenIssues = () =>
  selectIssues().filter((issue) => issue.status === ISSUE_STATUS.OPEN);
const selectCloseIssues = () =>
  selectIssues().filter((issue) => issue.status === ISSUE_STATUS.CLOSE);

const selectCurrentIssues = () => 
  selectIssues().filter((issue) => issue.status === store.selectedStatus);


const selectSelectedStatus = () => store.selectedStatus;
const setSelectedStatus = (status) => (store.selectedStatus = status);

export default {
  addChangeListener,
  selectOpenIssues,
  selectCloseIssues,
  selectCurrentIssues,
  selectSelectedStatus,
  setSelectedStatus,
};
