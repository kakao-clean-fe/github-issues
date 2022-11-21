import { FONT_BOLD, STATUS, HIDDEN, COLOR_POOL} from './const';
import { getLabelTpl, getIssueTpl, getIssueItemTpl, getLabelItemTpl } from '../tpl';
import { filterData } from '../init';
import { store } from '../store/store';
import { labelObj } from '../init';

export const getAppDiv = () => document.getElementById('app');
export const getElement = (selector) => document.querySelector(selector);
export const getElementAll = (selector) => document.querySelectorAll(selector);


const clickEventCallback = (listData, status) => {
    getElement('.open-count').classList.add(FONT_BOLD);
    geElement('.close-count').classList.remove(FONT_BOLD);

    filterData(listData, status);
}

export const initLabelEvents = () => {
    renderLabelTpl();
    setLabelFormToggleEvent();
    setRandomColorChangeEvent();
    setCreateLableClickEvent();
    setFormChangeEvent();
    setCancelLabelClickEvent();
    backgroundRandomChange();
}

export const backgroundRandomChange = () => {
    const color = COLOR_POOL.sort(() => Math.random() - 0.5)[0];

    getElement('#label-preview').style.backgroundColor = color;
    getElement('#new-label-color').style.backgroundColor = color;
    getElement('#labelColorValue').value = color;
    store.setLabelFormValue('labelColorValue', color);
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

export const setCreateLableClickEvent = () => {
    getElement('#label-create-button').addEventListener('click', (e) => {
        e.preventDefault();

        labelObj.addLabel();
    })
}

export const setCancelLabelClickEvent = () => {
    getElement('#label-cancel-button').addEventListener('click', () => {
        
        const formInputs = getElementAll('#label-input-wrapper input');

        formInputs.forEach((el) => {
        el.value = '';
        })
        
        store.clearForm();
        getElement('#new-label-form').classList.toggle(HIDDEN);
    })
}

export const setCreateButtonEnable = (isShow) => {
    const createLabelBtn = getElement('#label-create-button');

    if (isShow) {
        createLabelBtn.classList.remove('opacity-50');
        createLabelBtn.classList.add('opacity-100');
        createLabelBtn.style.cursor = 'pointer';
        createLabelBtn.disabled = false;

    } else {
        createLabelBtn.classList.add('opacity-50');
        createLabelBtn.classList.remove('opacity-100');
        createLabelBtn.style.cursor = 'not-allowed';
        createLabelBtn.disabled = true;
    }
}

export const setFormChangeEvent = () => {
    const formInputs = getElementAll('#label-input-wrapper input');

    formInputs.forEach((el) => {
        el.addEventListener('input', ({target}) => {
            store.setLabelFormValue(target.id, target.value);
        })
    })
}

