import { fetchBody } from "../../utils";

const getLabels = () => fetchBody("/labels");
const getLabelsDelay = (() => {
  let completed = false;
  const controller = new AbortController();
  const {signal} = controller;

  return () => {
    if(completed) {
      controller.abort();
    }
    fetchBody("/labels-delay", {signal}).finally(() => completed = false)
  }
})();

const addLabels = (label) =>
  fetchBody("/labels", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(label),
  });
  
const LabelApi = { getLabels, getLabelsDelay, addLabels };

export default LabelApi;
