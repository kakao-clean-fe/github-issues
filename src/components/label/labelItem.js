import {Component} from "../component.js";
import {getLabelItemTpl} from "../../tpl.js";

export class LabelItem extends Component {
    constructor(key, props, parentSelector) {
        super(key, props, parentSelector);
    }

    render() {
        const content = getLabelItemTpl(this._props);
        super.render(content, 'add');
    }
}