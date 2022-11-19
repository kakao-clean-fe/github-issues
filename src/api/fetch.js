import { asyncPipe } from "../helpers/fp-helpers.js";

export const fetchLabels = asyncPipe(
  () => fetch("/data-sources/labels.json"),
  (res) => res.json()
);
export const fetchIssues = asyncPipe(
  () => fetch("data-sources/issues.json"),
  (res) => res.json()
);
export const getLabels = asyncPipe(
  () => fetch("/labels"),
  (res) => res.json()
);
export const getLabelsWithDelay = asyncPipe(
  () => fetch("/labels-delay"),
  (res) => res.json()
);

// 새 요청이 들어왔을 때 이미 진행 중인 요청이 있다면 취소한다.
export const createLabel = (label) =>
  asyncPipe(
    () =>
      fetch("/labels", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(label),
      }),
    (res) => res.json()
  )();
