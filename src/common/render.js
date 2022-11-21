import { FONT_BOLD, STATUS, HIDDEN, COLOR_POOL} from './const';
import { getLabelTpl, getIssueTpl, getIssueItemTpl, getLabelItemTpl } from '../tpl';
import { filterData } from '../init';

export const getAppDiv = () => document.getElementById('app');
export const getElement = (selector) => document.querySelector(selector);

const clickEventCallback = (listData, status) => {
    getElement('.open-count').classList.add(FONT_BOLD);
    geElement('.close-count').classList.remove(FONT_BOLD);

    filterData(listData, status);
}

const backgroundRandomChange = () => {
    const color = COLOR_POOL.sort(() => Math.random() - 0.5)[0];

    getElement('#label-preview').style.backgroundColor = color;
    getElement('#new-label-color').style.backgroundColor = color;
}


export const renderItem = (item) => {
    getElement('.issue-list ul').innerHTML += item;
};

export const renderItems = (items) => {
    getListUl().innerHTML = '';
    
    items.forEach((item) => {
        renderItem(getIssueItemTpl(item));
    })

    return items;
}

export const renderCount = (openCount, closeCount) => {
    getElement('.open-count').innerHTML = `${openCount} Opened`;
    geElement('.close-count').innerHTML = `${closeCount} Closed`;
}

export const setEventListener = (listData) => {
    getElement('.open-count').addEventListener('click', () => {
        clickEventCallback(listData, STATUS.OPEN);
    });

    geElement('.close-count').addEventListener('click', () => {
        clickEventCallback(listData, STATUS.CLOSE);
    })

    return listData;
}

export const setLabelFormToggleEvent = () => {
    getElement('.new-label-button').addEventListener('click', () => {
        getElement('#new-label-form').classList.toggle(HIDDEN);
    })
}

export const renderLabelCount = (count) => {
    getElement('#label-count').innerHTML = `${count} Labels`;
}

export const setRandomColorChangeEvent = () => {
    getElement('#new-label-color').addEventListener('click', () => {
        backgroundRandomChange();
    })
}

export const renderLabelList = (labels) => {
    let labelsTpl = ''; 

    labels.forEach(({name, color, description}) => {
        labelsTpl += getLabelItemTpl({ name, color, description })
    });

    getElement('#labels-wrapper .label-list').innerHTML = labelsTpl;
}

export const renderLabelTpl = () => {
    getAppDiv().innerHTML = getLabelTpl();
}

