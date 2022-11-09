import { getIssueItemTpl } from "../../tpl.js";

export default class IssueItems {
    render(baseElement) {
        return function (items) {
            baseElement.innerHTML = items.reduce((previousValue, currentValue) => {
                previousValue += getIssueItemTpl(currentValue);
                return previousValue;
            }, "");
        };
    }
}