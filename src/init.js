import {STATUS} from './const';
import {renderCount, renderItems} from './render';

export const loadData = () => {
    return fetch('../data-sources/issues.json')
};

export const setItemCounts = (listData) => {
    let openedItemCount = 0;
    let closedItemCount = 0;

    listData.forEach((item) => {
        openedItemCount += item.status === STATUS.OPEN ? 1 : 0;
        closedItemCount += item.status === STATUS.CLOSE ? 1 : 0;
    });
    
    renderCount(openedItemCount, closedItemCount);
}

export const filterData = (listData, status = STATUS.OPEN) => {
    const result = [];

    listData.forEach((item) => {
        if (item.status === status) {
            result.push(item);
        }
    })
    
    renderItems(result);
}


