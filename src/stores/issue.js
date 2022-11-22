import {ArrayStore, Observable} from "./models.js";
import {ISSUE_STATUS} from "../lib/constants/common.js";

class IssueStore extends ArrayStore {
    get(issueStatus) {
     return issueStatus ? this.#filterStatus(issueStatus) : [...this.list]
    }

    #filterStatus(issueStatus) {
        if (!Object.values(ISSUE_STATUS).includes(issueStatus)) throw Error("잘못된 형식입니다.")
        return this.list.filter((issue) => issue.status === issueStatus)
    }
}

class IssueStatusStore extends Observable {
    constructor(initialData) {
        super();
        this.#validateStatus(initialData)
        this.status = initialData
    }

    #validateStatus(status) {
        if (!Object.values(ISSUE_STATUS).includes(status)) throw Error("잘못된 형식입니다.")
    }


    set(status) {
        this.#validateStatus(status)
        this.status = status
        this.notify(this.status)
    }

    get() {
        return this.status
    }
}

class SelectedIssueStore extends ArrayStore {
}


export let issueStore = new IssueStore([])
export let issueStatusStore = new IssueStatusStore(ISSUE_STATUS.OPEN)
export let selectedIssueStore = new SelectedIssueStore([])
