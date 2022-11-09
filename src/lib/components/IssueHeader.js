import { getIssueTpl } from "../../tpl.js";

export default class IssueHeader {
    render(baseElement) {
        return function (openItemsCount, closedItemsCount) {
            baseElement.innerHTML = getIssueTpl(openItemsCount, closedItemsCount);
        };
    }
}