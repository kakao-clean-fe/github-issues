import {Label} from "../types";
import {LabelContactType} from "../presenter/labels";
import {readLabels} from '../utils';

let resource: Array<Label> = [];

const model = (labelContact: LabelContactType) => {
    const getResource = () => resource;
    const setResource = (payload: Array<Label>) => resource = payload;

    const loadLabel = () => {
        if (!resource.length) labelContact.notifyLoaded(resource);
        readLabels().then(labels => {
            console.log(labels);
            resource = labels;
            labelContact.notifyLoaded(resource);
        });
    };

    return { getResource, setResource, loadLabel }
}

export default model;