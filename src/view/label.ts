import {$} from '../utils';
import {Label} from "../types";
import {getLabelItemTpl, getLabelTpl} from "../tpl";
import LabelPresenter, {LabelPresenterType} from "../presenter/labels";
import NewLabelForm from "./newLabelForm";

export default class LabelView {
    private newLabelform?: NewLabelForm;
    private readonly presenter: LabelPresenterType;
    private readonly $app: HTMLDivElement | null;
    private $openCount: HTMLDivElement | null = null;
    private $newLabel: HTMLDivElement | null = null;
    private $list: HTMLUListElement | null = null;

    public constructor() {
        this.$app = $('#app');
        this.presenter = new LabelPresenter(this);
    }

    public attach () {
        if (!this.$app) return;
        this.$app.innerHTML = getLabelTpl();
        this.newLabelform = new NewLabelForm(this.presenter);
        this.$list = $('.label-list', this.$app);
        this.$openCount = $('.label-header .open-count');
        this.$newLabel = $('.new-label-button');
        this.presenter.loadLabelList();
        this.attachEvent();
    }

    public updateLabels (labels: Array<Label>) {
        this.updateList(labels);
        this.updateLabelCounts(labels);
    }

    private updateList (labels: Array<Label>) {
        if (!this.$list) return;
        this.$list.innerHTML = labels?.reduce((acc, label) => `${acc}${getLabelItemTpl(label)}`, '') ?? '';
    }

    private updateLabelCounts (labels: Array<Label>) {
        if (!this.$openCount) return;
        this.$openCount.innerHTML = `${labels.length} Labels`;
    }

    private attachEvent() {
        if (!this.$newLabel) return;
        this.$newLabel.addEventListener('click', () => this.newLabelform?.toggle());
    }
}