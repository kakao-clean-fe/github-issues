import { OPEN_COUNT, CLOSE_COUNT, FONT_BOLD, STATUS} from './const';
import { getIssueItemTpl } from './tpl';
import { filterData } from './init';

export const renderItem = (item) => {
    const listDocument = document.getElementsByClassName('issue-list')[0];
    const listUl = listDocument.getElementsByTagName('ul')[0];

    listUl.innerHTML += item;
};


export const renderItems = (items) => {
    const listDocument = document.getElementsByClassName('issue-list')[0];
    const listUl = listDocument.getElementsByTagName('ul')[0];

    listUl.innerHTML = '';
    
    items.forEach((item) => {
        renderItem(getIssueItemTpl(item));
    })
}

export const renderCount = (openCount, closeCount) => {
    const openCountDiv = document.getElementsByClassName(OPEN_COUNT)[0];
    const closeCountDiv = document.getElementsByClassName(CLOSE_COUNT)[0];

    openCountDiv.innerHTML = `${openCount} Opened`;
    closeCountDiv.innerHTML = `${closeCount} Closed`;
}

export const setEventListener = (listData) => {
    const openCountDiv = document.getElementsByClassName(OPEN_COUNT)[0];
    const closeCountDiv = document.getElementsByClassName(CLOSE_COUNT)[0];

    openCountDiv.addEventListener('click', () => {
        openCountDiv.classList.add(FONT_BOLD);
        closeCountDiv.classList.remove(FONT_BOLD);
        
        filterData(listData, STATUS.OPEN);
    });

    closeCountDiv.addEventListener('click', () => {
        openCountDiv.classList.remove(FONT_BOLD);
        closeCountDiv.classList.add(FONT_BOLD);
        
        filterData(listData, STATUS.CLOSE);
    })
}