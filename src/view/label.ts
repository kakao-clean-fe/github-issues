import {$} from '../utils';
import {Label} from "../types";
import {getLabelItemTpl, getLabelTpl} from "../tpl";

export type LabelViewType = ReturnType<typeof LabelView>;

export const LabelView = () => {
    const $app = $('#app');
    if (!$app) throw new Error('not found #app element, plz reload page');

    let $list: HTMLUListElement | null = null;

    const updateApp = (labels: Array<Label>) => {
        if (!$list) return
        $list.innerHTML = labels.reduce((acc, label) => `${acc}${getLabelItemTpl(label)}`, '');
    }

    const attach = () => {
        $app.innerHTML = getLabelTpl();
        $list = $('.label-list', $app);
    }

    return {attach, updateApp};
}