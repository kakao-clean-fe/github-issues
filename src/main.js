import {getIssueTpl} from './tpl';
import {filterData, loadData, setItemCounts} from './init';
import {renderItems, setEventListener} from './render';

const main = () => {
    let listData = [];
    
    document.getElementById('app').innerHTML = getIssueTpl();

    loadData()
        .then((response) => response.json())
        .then((json) => listData = json)
        .then(() => {
            renderItems(listData);
            setItemCounts(listData);
            filterData(listData);
            setEventListener(listData);
        })
}

main();