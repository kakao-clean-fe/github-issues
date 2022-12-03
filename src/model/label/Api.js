import { fetchBody, abortableFetchBody } from "../../utils";

const getLabels = () => fetchBody("/labels");

const getLabelsDelay = () => abortableFetchBody('/labels-delay');

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
