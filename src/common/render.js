import { FONT_BOLD, STATUS, HIDDEN, COLOR_POOL} from './const';
import { getLabelTpl, getIssueTpl, getIssueItemTpl, getLabelItemTpl } from '../tpl';
import { filterData } from '../init';

export const getAppDiv = () => document.getElementById('app');

const getListUl = () => document.querySelector('.issue-list ul');
const getOpenCountDiv = () => document.querySelector(".open-count");
const getCloseCountDiv = () =>  document.querySelector(".close-count");
const getLabelFormTpl = () => document.querySelector("#new-label-form");
const getNewLabelButton = () => document.querySelector(".new-label-button");
const getLabelCountDiv = () => document.querySelector("#label-count");
const getLabelPreviewDiv = () => document.querySelector("#label-preview");
const getColorChangeButton = () => document.querySelector("#new-label-color");
const getLabelListTpl = () => document.querySelector("#labels-wrapper .label-list");

const clickEventCallback = (listData, status) => {
    getOpenCountDiv().classList.add(FONT_BOLD);
    getCloseCountDiv().classList.remove(FONT_BOLD);

    filterData(listData, status);
}

const backgroundRandomChange = () => {
    const color = COLOR_POOL.sort(() => Math.random() - 0.5)[0];

    getLabelPreviewDiv().style.backgroundColor = color;
    getColorChangeButton().style.backgroundColor = color;
}


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
        clickEventCallback(listData, STATUS.OPEN);
    });

    getCloseCountDiv().addEventListener('click', () => {
        clickEventCallback(listData, STATUS.CLOSE);
    })

    return listData;
}

export const setLabelFormToggleEvent = () => {
    getNewLabelButton().addEventListener('click', () => {
        getLabelFormTpl().classList.toggle(HIDDEN);
    })
}

export const renderLabelCount = (count) => {
    getLabelCountDiv().innerHTML = `${count} Labels`;
}

export const setRandomColorChangeEvent = () => {
    getColorChangeButton().addEventListener('click', () => {
        backgroundRandomChange();
    })
}

export const renderLabelList = (labels) => {
    let labelsTpl = ''; 

    labels.forEach(({name, color, description}) => {
        labelsTpl += getLabelItemTpl({ name, color, description })
    });

    getLabelListTpl().innerHTML = labelsTpl;
}

export const renderLabelTpl = () => {
    getAppDiv().innerHTML = getLabelTpl();
}

