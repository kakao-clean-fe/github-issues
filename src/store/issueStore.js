import createStore from ".";
import { ISSUE_STATUS } from "../constant";
import { cacheFunction, fetchBody } from "../utils";

const { addChangeListener, getState, setState } = createStore({
  issues: [],
  selectedStatus: ISSUE_STATUS.OPEN,
});

const initState = async () => {
  const issues = fetchBody("/data-sources/issues.json");
  setState({
    ...getState(),
    issues,
  });
};

initState();

const selectIssues = cacheFunction((state) => state.issues);

const selectOpenIssues = cacheFunction((state) =>
  selectIssues(state).filter((issue) => issue.status === ISSUE_STATUS.OPEN)
);

const selectCloseIssues = cacheFunction((state) =>
  selectIssues(state).filter((issue) => issue.status === ISSUE_STATUS.CLOSE)
);

const selectCurrentIssues = cacheFunction((state) =>
  selectIssues(state).filter(
    (issue) => issue.status === selectSelectedStatus(state)
  )
);

const selectSelectedStatus = cacheFunction((state) => state.selectedStatus);


export default {
  addChangeListener,
  selectOpenIssues,
  selectCloseIssues,
  selectCurrentIssues,
  selectSelectedStatus,
  getState,
  setState,
};
