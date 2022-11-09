import { OPEN_COUNT, CLOSE_COUNT, FONT_BOLD, STATUS} from './const';
import { getIssueItemTpl } from './tpl';
import { filterData } from './init';

export const getAppDiv = () => document.getElementById('app');

const getListUl = () => document.querySelector('.issue-list ul');
const getOpenCountDiv = () => document.querySelector(".open-count")
const getCloseCountDiv = () =>  document.querySelector(".close-count")

export const renderItem = (item) => {
    getListUl().innerHTML += item;
};

export const renderItems = (items) => {
    getListUl().innerHTML = '';
    
    items.forEach((item) => {
        renderItem(getIssueItemTpl(item));
    })

    return items;
}

export const renderCount = (openCount, closeCount) => {
    getOpenCountDiv().innerHTML = `${openCount} Opened`;
    getCloseCountDiv().innerHTML = `${closeCount} Closed`;
}

export const setEventListener = (listData) => {
    getOpenCountDiv().addEventListener('click', () => {
        getOpenCountDiv().classList.add(FONT_BOLD);
        getCloseCountDiv().classList.remove(FONT_BOLD);
        
        filterData(listData, STATUS.OPEN);
    });

    getCloseCountDiv().addEventListener('click', () => {
        getOpenCountDiv().classList.remove(FONT_BOLD);
        getCloseCountDiv().classList.add(FONT_BOLD);
        
        filterData(listData, STATUS.CLOSE);
    })

    return listData;
}