import {Label} from "../types";
import {LabelContactType} from "../presenter/labels";
import {readLabels} from "../request";

let resource: Array<Label> = [];

const model = (labelContact: LabelContactType) => {
    const getResource = () => resource;
    const setResource = (payload: Array<Label>) => {
        resource = payload;
        labelContact.notify(resource);
    }

    const loadLabel = () => {
        if (!resource.length) labelContact.notify(resource);
        readLabels().then(labels => {
            resource = labels;
            labelContact.notify(resource);
        });
    };

    return { getResource, setResource, loadLabel }
}

export default model;