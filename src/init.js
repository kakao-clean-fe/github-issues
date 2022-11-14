import {STATUS} from './common/const';
import {renderCount, renderItems} from './common/render';
import {fetchData} from './utils';

export const fetchIssues = () => fetchData("../data-sources/issues.json");
export const fetchLabels = () => fetchData("../data-sources/labels.json");

export const setItemCounts = (listData) => {
    const openedItemCount = listData.filter((item) => item.status === STATUS.OPEN).length;
    const closedItemCount = listData.filter((item) => item.status === STATUS.CLOSE).length;

    renderCount(openedItemCount, closedItemCount);

    return listData;
}

export const filterData = (listData, status = STATUS.OPEN) => {
    renderItems(listData.filter((item) => item.status === status));
}


