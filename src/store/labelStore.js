import createStore from ".";
import { cacheFunction, fetchBody } from "../utils";

const { addChangeListener, getState, setState } = createStore({
  labels: [],
});

const initState = async () => {
  const labels = await fetchBody("/data-sources/labels.json");
  setState({
    labels,
  });
};

initState();

const selectLabels = cacheFunction(state => state.labels);

const addLabel = (label) => {
  const labels = selectLabels(getState()).concat(label);
  setState({
    labels
  })
}
/** id가 없기 때문에 name은 unique라고 가정한다. */
const removeLabel = (labelName) => {
  const labels = selectLabels(getState()).filter(({name}) => name !== labelName);
  setState({
    labels
  })
}

export default {
  addChangeListener,
  selectLabels,
  getState,
  setState,
  addLabel,
  removeLabel
};
