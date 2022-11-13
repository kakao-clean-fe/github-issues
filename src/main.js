import initializeIssue from "./issue";
import initializeLabel from "./label";

const [issue, label] = document.querySelectorAll("nav button");
const target = document.getElementById("app");

issue.addEventListener("click", () => initializeIssue(target));
label.addEventListener("click", () => initializeLabel(target));

initializeIssue(target);
