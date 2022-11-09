import {STATUS} from './const';
import {renderCount, renderItems} from './render';
import { filter } from './utils';

export const loadData = () => fetch('../data-sources/issues.json').then((response) => response.json());

export const setItemCounts = (listData) => {
    const openedItemCount = filter(listData, (item) => item.status === STATUS.OPEN).length;
    const closedItemCount = filter(listData, (item) => item.status === STATUS.CLOSE).length;

    renderCount(openedItemCount, closedItemCount);

    return listData;
}

export const filterData = (listData, status = STATUS.OPEN) => {
    renderItems(filter(listData, (item) => item.status === status));
}


