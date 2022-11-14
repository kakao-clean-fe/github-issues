import {RENDER_TYPE} from "../consts/const.js";

export class Component {
    _key = null;
    _index = 0;
    _props = {}
    _parentSelector = null;
    _children = [];
    _afterMountEvent = null;
    _mountEvent = null;
    _isMounted = false;
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
        if(isClear) document.querySelector(filteredChildren[0]._parentSelector).innerHTML = '';
        filteredChildren.forEach((child) => child.render());
    }

    _appendChild(childComponent) {
        this._children.push(childComponent);
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