import {STATUS} from './common/const';
import {renderCount, renderItems} from './common/render';
import {fetchData} from './utils';
import {Label} from './components/label';

export const labelObj = new Label();

export const setItemCounts = (listData) => {
    const openedItemCount = listData.filter((item) => item.status === STATUS.OPEN).length;
    const closedItemCount = listData.filter((item) => item.status === STATUS.CLOSE).length;

    renderCount(openedItemCount, closedItemCount);

    return listData;
}

export const filterData = (listData, status = STATUS.OPEN) => {
    renderItems(listData.filter((item) => item.status === status));
}


