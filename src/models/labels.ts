import {Label} from "../types";
import {readLabels} from "../request";
import {BaseModel} from "./base";

export { type LabelModel as LabelModelType };

class LabelModel extends BaseModel<Array<Label>> {
    public constructor() {
        super([]);
    }

    get getResource(): Array<Label> {
        return this.resource;
    }

    set setResource(payload: Array<Label>) {
        this.resource = payload;
        this.notify(this.resource);
    }

    public loadLabel() {
        readLabels().then(labels => this.setResource = labels);
    }
}

export default new LabelModel();