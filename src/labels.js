import Observable from "./observable";

export default class Labels extends Observable {
    constructor(labels){
        super();
        this.labels = labels;
    }

    getLabels() {
        return this.labels;
    }

    addLabel(label){
        this.labels.append(label);
        this.notify();
    }
}