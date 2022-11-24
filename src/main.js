//msw worker
import { worker } from "./mocks/browser";
worker.start();

import initializeIssue from "./pages/issue";
import initializeLabel from "./pages/label";

const [issue, label] = document.querySelectorAll("nav button");
const target = document.getElementById("app");

issue.addEventListener("click", () => initializeIssue(target));
label.addEventListener("click", () => initializeLabel(target));

initializeIssue(target);
