import {RENDER_TYPE} from "../consts/const.js";

export class Component {
    _key = null;
    _props = {}
    _index = 0; // child 컴포넌트 렌더링에 활용할 seq한 값
    _children = [];
    /* component mount와 제어할 이벤트 */
    _isMounted = false;
    _afterMountEvent = null;
    _mountEvent = null;
    /* render에 활용 목적 */
    _parentSelector = null;
    _selector = null; // replace 할 때 사용

    constructor(key, props, parentSelector) {
        this._key = key;
        this._props = props;
        this._parentSelector = parentSelector;
    }

    render(content, type) {
        if (!this._isMounted) this.#mountEvent().then(() => this.#render(content, type));
        else this.#render(content, type);
    }

    #render(content, type) {
        const parent = document.querySelector(this._parentSelector);
        const tpl = document.createElement('template');
        tpl.innerHTML = content;
        if (!parent) throw Error('parent is not exist!');
        if (type === RENDER_TYPE.OVERRIDE) {
            parent.innerHTML = tpl.innerHTML;
        } else if (type === RENDER_TYPE.ADD) {
            parent.appendChild(tpl.content);
        } else if (type === RENDER_TYPE.REPLACE) {
            parent.replaceChild(tpl.content, parent.querySelector(this._selector));
        }
        this._renderChild();
        this.#afterMountEvent();
        if (!this._isMounted) this._isMounted = true;
    }

    _renderChild(skipChildren = [], isClear = false) {
        const children = this._children;
        if (!children?.length) return;
        const filteredChildren = children.filter((child) => !skipChildren.includes(child._key));
        if(isClear) this._removeChild(filteredChildren[0]?._parentSelector);
        filteredChildren.forEach((child) => child.render());
    }

    _removeChild(parentSelector) {
        const target = document.querySelector(parentSelector)
        if(target) document.querySelector(parentSelector).innerHTML = '';
    }

    _initChild(childComponents) {
        this._children = childComponents;
    }

    #afterMountEvent() {
        this._afterMountEvent?.call(this);
    }

    async #mountEvent() {
        await this._mountEvent?.call(this);
    }
}