import {$} from '../utils';
import {LabelPresenterType} from "../presenter/labels";
import {Label} from "../types";

type LabelState = {
    name: string;
    desc: string;
    color: string;
}

export default class NewLabelForm {
    private labelPresenter: LabelPresenterType;
    private readonly $form: HTMLFormElement | null;
    private readonly $labelPreview: HTMLSpanElement | null = null;
    private readonly $labelInput: HTMLInputElement | null = null;
    private readonly $labelDescription: HTMLInputElement | null = null;
    private readonly $labelRandomColor: HTMLButtonElement | null = null;
    private readonly $labelColorCode: HTMLInputElement | null = null;
    private readonly $createButton: HTMLButtonElement | null = null;
    private readonly $closeButton: HTMLButtonElement | null = null;
    private labelState: LabelState = {name: '', desc: '', color: ''};

    public constructor(presenter: LabelPresenterType) {
        this.labelPresenter = presenter;
        this.$form = $('.new-label-form');
        this.$labelPreview = $('#label-preview', this.$form);
        this.$labelInput = $('#label-name-input', this.$form);
        this.$labelDescription = $('#label-description-input', this.$form);
        this.$labelRandomColor = $('#new-label-color', this.$form);
        this.$labelColorCode = $('#label-color-value', this.$form);
        this.$createButton = $('#label-create-button', this.$form);
        this.$closeButton = $('#cancel-create-label', this.$form);
        this.attachEvent();
    }

    public toggle() {
        this.$form?.classList.toggle('hidden');
    }

    public hide() {
        this.$form?.classList.add('hidden');
    }

    private attachEvent() {
        this.$closeButton?.addEventListener('click', this.hide.bind(this));
        this.$labelRandomColor?.addEventListener('click', this.updateRandomColorCode.bind(this));
        this.$labelInput?.addEventListener('input', this.updateLabelInput.bind((this)));
        this.$labelDescription?.addEventListener('input', this.updateLabelDesc.bind(this));
        this.$form?.addEventListener('submit', this.submitForm.bind(this));
    }

    private setState(nextState: Partial<LabelState>) {
        this.labelState = {...this.labelState, ...nextState};
        this.updateCreateButton();
    }

    private updateRandomColorCode() {
        const randomColor = Math.round(Math.random() * 0xffffff);
        const hexCode = `#${randomColor.toString(16).toUpperCase()}`;
        this.setState({color: hexCode});
        if (this.$labelColorCode) this.$labelColorCode.value = hexCode;
        if (this.$labelRandomColor) this.$labelRandomColor.style.backgroundColor = hexCode;
        if (this.$labelPreview) this.$labelPreview.style.backgroundColor = hexCode;
    }

    private updateLabelInput() {
        if (!this.$labelInput) return;
        this.setState({name: this.$labelInput.value.trim()});
    }

    private updateLabelDesc() {
        if (!this.$labelDescription) return;
        this.setState({desc: this.$labelDescription.value.trim()});
    }

    private submitForm(e: SubmitEvent) {
        const newLabel: Label = {
            name: this.labelState.name,
            description: this.labelState.desc,
            color: this.labelState.color.replace('#', '')
        };
        this.labelPresenter.appendLabelList(newLabel);
        e.preventDefault();
    }

    private validation() {
        return !!this.labelState.name && !!this.labelState.desc && !!this.labelState.color;
    }

    private updateCreateButton() {
        if (!this.$createButton) return;
        this.$createButton.disabled = !this.validation();
        if (this.$createButton.disabled) this.$createButton.classList.add('opacity-50');
        else this.$createButton.classList.remove('opacity-50');
    }
}