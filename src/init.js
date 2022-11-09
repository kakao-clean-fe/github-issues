import {STATUS} from './const';
import {renderCount, renderItems} from './render';

export const loadData = () => fetch('../data-sources/issues.json').then((response) => response.json());

export const setItemCounts = (listData) => {
    const openedItemCount = listData.filter((item) => item.status === STATUS.OPEN).length;
    const closedItemCount = listData.filter((item) => item.status === STATUS.CLOSE).length;

    renderCount(openedItemCount, closedItemCount);

    return listData;
}

export const filterData = (listData, status = STATUS.OPEN) => {
    renderItems(listData.filter((item) => item.status === status));
}


