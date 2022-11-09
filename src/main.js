import {getIssueTpl} from './tpl';
import {filterData, loadData, setItemCounts} from './init';
import {getAppDiv, renderItems, setEventListener} from './render';
import {pipe, fetchData} from './utils';

const main = () => {
    getAppDiv().innerHTML = getIssueTpl();

    const loadData = async () => {
        const [issues, labels] = await Promise.all([
            fetchData("../data-sources/issues.json"),
            fetchData("../data-sources/labels.json"),
        ]);
        
        pipe(renderItems, setItemCounts, setEventListener, filterData)(issues)
    };

    loadData();
}

main();