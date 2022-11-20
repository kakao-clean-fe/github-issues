import { asyncPipe } from "../helpers/fp-helpers.js";

export const fetchLabels = asyncPipe(
  () => fetch("/data-sources/labels.json"),
  (res) => res.json()
);
export const fetchIssues = asyncPipe(
  () => fetch("data-sources/issues.json"),
  (res) => res.json()
);

// 새 요청이 들어왔을 때 이미 진행 중인 요청이 있다면 취소한다.
let controller = null;
export const getLabelsWithDelay = async () => {
  if (controller) controller.abort();
  controller = new AbortController();
  let res = fetch("/labels-delay", {
    signal: controller.signal,
  })
    .then((res) => {
      return res.json();
    })
    .catch((e) => console.error(e))
    .finally(() => (controller = null));
  return res;
};

export const getLabels = async () => {
  try {
    const res = await fetch("/labels");
    return await res.json();
  } catch (e) {
    console.error("Unknown Error");
  }
};

export const createLabel = async (label) => {
  try {
    const res = await fetch("/labels", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(label),
    });
    return await res.json();
  } catch (e) {
    console.error("Unknown Error");
  }
};
