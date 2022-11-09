import {getIssueTpl} from './tpl';
import {filterData, loadData, setItemCounts} from './init';
import {getAppDiv, renderItems, setEventListener} from './render';
import {pipe} from './utils';

const main = () => {
    getAppDiv().innerHTML = getIssueTpl();

    loadData()
        .then((data) => 
            pipe(renderItems, setItemCounts, setEventListener, filterData)(data));
    
}

main();