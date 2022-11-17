import * as template from "./tpl";

export default class LabelView {
    constructor(labels) {
        this.init();
        this.labels = labels;
        this.labels.subscribe(this.render.bind(this));
        this.render();
    }

    init() {
        const $app = document.querySelector("#app");
        $app.innerHTML = template.getLabelTpl();
        this.$labelList = document.querySelector(".label-list");
        this.$labelCount = document.querySelector(".label-header .open-count");
    }

    render() {
        const labels = this.labels.getLabels();
        this.$labelCount.innerHTML = `${labels.length} Labels`;
        this.$labelList.innerHTML = labels.map(label =>
            template.getLabelItemTpl(label)
        ).join("");
    }
}