import {Component} from "../component.js";
import {getLabelItemTpl} from "../../tpl.js";
import {RENDER_TYPE} from "../../consts/const.js";

export class LabelItem extends Component {
    constructor(key, props, parentSelector) {
        super(key, props, parentSelector);
    }

    render() {
        const content = getLabelItemTpl(this._props);
        super.render(content, RENDER_TYPE.ADD);
    }
}