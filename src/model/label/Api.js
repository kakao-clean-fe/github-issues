import { fetchBody } from "../../utils";

const getLabels = () => fetchBody("/labels");

const throwIfNotAbortError = error => {
  if(error.name !== 'AbortError') {
    throw error;
  }
}

const getLabelsDelay = (() => {
  let requested = false;
  let controller;
  
  return () => {
    if(requested) {
      controller.abort();
    }
    controller = new AbortController();
    const {signal} = controller;
    requested = true;


    return fetchBody("/labels-delay", {signal})
      .then((res) => {
        requested = false
        return res;
      })
      .catch(throwIfNotAbortError)
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
