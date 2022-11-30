import {STATUS} from './common/const';
import {renderItems} from './common/render';
import { LabelModel } from './model/label-model';

export let labelObj = {};

export const init = () => {
    labelObj = new LabelModel();
}

export const filterData = (listData, status = STATUS.OPEN) => {
    renderItems(listData.filter((item) => item.status === status));
}


