import {Observable} from "./models.js";

export class LabelStore extends Observable {
    constructor(initialData) {
        super();
        this._list = Array.isArray(initialData) ? initialData : []
    }

    add(...element) {
        this._list = [...this._list, ...element];
        this.notify(this._list);
    }

    get() {
        return [...this._list]
    }
}

export let labelStore = new LabelStore([])

