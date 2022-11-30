import { FONT_BOLD, STATUS, HIDDEN, COLOR_POOL, LABEL_PREVIEW,
NEW_LABEL_COLOR,
LABEL_COLOR_VALUE,
ISSUE_LIST_UL,
NEW_LABEL_BUTTON,
NEW_LABEL_FORM,
LABEL_COUNT,
LABEL_LIST,
LABEL_CREATE_BUTTON,
LABEL_CANCEL_BUTTON,
LABEL_INPUT,
OPACITY_50,
OPACITY_100,
POINTER,
NOT_ALLOWED} from './const';
import { getLabelTpl, getIssueTpl, getIssueItemTpl, getLabelItemTpl } from '../tpl';
import { labelObj, filterData } from '../init';
// Store
import labelStore, { SET_LABEL_COLOR, SET_LABEL_FORM_VALUE } from '../store/label-store';
import { LabelModel } from '../model/label-model';

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

    getElement(LABEL_PREVIEW).style.backgroundColor = color;
    getElement(NEW_LABEL_COLOR).style.backgroundColor = color;
    getElement(LABEL_COLOR_VALUE).value = color;

    labelStore.dispatch({type: SET_LABEL_COLOR, payload: color})
}


export const renderItem = (item) => {
    getElement(ISSUE_LIST_UL).innerHTML += item;
};

export const renderItems = (items) => {
    getListUl().innerHTML = '';
    
    items.forEach((item) => {
        renderItem(getIssueItemTpl(item));
    })

    return items;
}

export const renderCount = (openCount, closeCount) => {
    getElement(OPEN_COUNT).innerHTML = `${openCount} Opened`;
    geElement(CLOSE_COUNT).innerHTML = `${closeCount} Closed`;
}

export const setEventListener = (listData) => {
    getElement(OPEN_COUNT).addEventListener('click', () => {
        clickEventCallback(listData, STATUS.OPEN);
    });

    geElement(CLOSE_COUNT).addEventListener('click', () => {
        clickEventCallback(listData, STATUS.CLOSE);
    })

    return listData;
}

export const setLabelFormToggleEvent = () => {
    getElement(NEW_LABEL_BUTTON).addEventListener('click', () => {
        getElement(NEW_LABEL_FORM).classList.toggle(HIDDEN);
    })
}

export const renderLabelCount = (count) => {
    getElement(LABEL_COUNT).innerHTML = `${count} Labels`;
}

export const setRandomColorChangeEvent = () => {
    getElement(NEW_LABEL_COLOR).addEventListener('click', () => {
        backgroundRandomChange();
    })
}

export const renderLabelList = (labels) => {
    let labelsTpl = ''; 

    labels.forEach(({name, color, description}) => {
        labelsTpl += getLabelItemTpl({ name, color, description })
    });

    getElement(LABEL_LIST).innerHTML = labelsTpl;
}

export const renderLabelTpl = () => {
    getAppDiv().innerHTML = getLabelTpl();
}

export const setCreateLableClickEvent = () => {
    getElement(LABEL_CREATE_BUTTON).addEventListener('click', (e) => {
        e.preventDefault();

        labelObj.addLabel();
    })
}

export const setCancelLabelClickEvent = () => {
    getElement(LABEL_CANCEL_BUTTON).addEventListener('click', () => {
        
        const formInputs = getElementAll(LABEL_INPUT);

        formInputs.forEach((el) => {
        el.value = '';
        })
        
        labelObj.clearForm();
        getElement(NEW_LABEL_FORM).classList.toggle(HIDDEN);
    })
}

export const setCreateButtonEnable = (isShow) => {
    const createLabelBtn = getElement(LABEL_CREATE_BUTTON);

    if (isShow) {
        createLabelBtn.classList.remove(OPACITY_50);
        createLabelBtn.classList.add(OPACITY_100);
        createLabelBtn.style.cursor = POINTER;
        createLabelBtn.disabled = false;

    } else {
        createLabelBtn.classList.add(OPACITY_50);
        createLabelBtn.classList.remove(OPACITY_100);
        createLabelBtn.style.cursor = NOT_ALLOWED;
        createLabelBtn.disabled = true;
    }
}

export const setFormChangeEvent = () => {
    const formInputs = getElementAll(LABEL_INPUT);

    formInputs.forEach((el) => {
        el.addEventListener('input', ({target}) => {
            labelStore.dispatch({type: SET_LABEL_FORM_VALUE, payload: target})
        })
    })
}

