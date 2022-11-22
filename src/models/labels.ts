import {Label} from "../types";
import {readDelaiedLabels, readLabels, updateLabels} from "../request";
import {BaseModel} from "./base";
import { DelayRequestOption } from "../request";

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

    public updateResource(payload: Array<Label>) {
        return updateLabels(payload).then(() => {
            this.resource = payload;
            this.notify(this.resource);
        });
    }

    public loadDelaiedLabel({signal}: DelayRequestOption) {
        readDelaiedLabels({ signal }).then(labels => {
            this.setResource = labels;
        })
    }

    public loadLabel() {
        readLabels().then(labels => this.setResource = labels);
    }
}

export default new LabelModel();