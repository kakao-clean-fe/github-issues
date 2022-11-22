import {$} from '../utils';
import {Label} from "../types";
import {getLabelItemTpl, getLabelTpl} from "../tpl";
import LabelPresenter, {LabelPresenterType} from "../presenter/labels";
import NewLabelForm from "./newLabelForm";

import toast from "./toast";

export default class LabelView {
    private newLabelform?: NewLabelForm;
    private readonly presenter: LabelPresenterType;
    private readonly $app: HTMLDivElement | null;
    private $openCount: HTMLDivElement | null = null;
    private $newLabel: HTMLDivElement | null = null;
    private $updateLabel: HTMLButtonElement | null = null;
    private $list: HTMLUListElement | null = null;
    private abortController?: AbortController;

    public constructor() {
        this.$app = $('#app');
        this.presenter = new LabelPresenter(this);
    }

    public attach () {
        if (!this.$app) return;
        this.$app.innerHTML = getLabelTpl();
        this.newLabelform = new NewLabelForm(this.presenter);
        this.$list = $('.label-list', this.$app);
        this.$openCount = $('.label-header .open-count', this.$app);
        this.$newLabel = $('.new-label-button', this.$app);
        this.$updateLabel = $('.refresh-labels', this.$app);
        this.presenter.loadLabelList();
        this.attachEvent();
    }

    public updateLabels (labels: Array<Label>) {
        this.updateList(labels);
        this.updateLabelCounts(labels);
    }

    public notifyUpdateError() {
        console.error('failed generatre new label');
        toast.show('라벨 생성에 실패했습니다.', 'error');
    }

    private updateList (labels: Array<Label>) {
        this.abortController = undefined;
        if (!this.$list) return;
        this.$list.innerHTML = labels?.reduce((acc, label) => `${acc}${getLabelItemTpl(label)}`, '') ?? '';
    }

    private updateLabelCounts (labels: Array<Label>) {
        if (!this.$openCount) return;
        this.$openCount.innerHTML = `${labels.length} Labels`;
    }

    private attachEvent() {
        if (!this.$newLabel || !this.$updateLabel) return;
        this.$newLabel.addEventListener('click', () => this.newLabelform?.toggle());
        this.$updateLabel.addEventListener('click', () => {
            if (this.abortController) {
                this.abortController.signal;
                this.abortController.abort();
            }
            this.abortController = new AbortController();
            this.presenter.loadDelaiedList({ signal: this.abortController.signal });
        });
    }
}