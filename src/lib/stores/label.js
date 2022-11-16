import {get} from "../api.js";
import {Observable} from "./models.js";

export class LabelStore extends Observable {
    constructor(url) {
        super();
        this._list = [];
        this.#getInitialData(url)
    }

    #getInitialData(url) {
        get(url).then(data => this._list = [...data])
    }

    add(element) {
        this._list = [...this._list, element];
        this.notify(this._list);
    }

    get() {
        return [...this._list]
    }
}

export let labelStore = new LabelStore("/data-sources/labels.json")

