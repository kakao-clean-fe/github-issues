import { renderLabelList, renderLabelCount, setLabelFormToggleEvent, setRandomColorChangeEvent } from "./common/render";
import { store } from './store/store';
import Observable from './observable';

export class Issue extends Observable {

    constructor(issues){
        super();

        store.setIssues(issues);
    }

    init(issues) {
        this.setIssues(issues);

        setLabelFormToggleEvent();
        setRandomColorChangeEvent();
    }

    setIssues(issues) {
        store.setIssues(issues);

        this.render();
    }

    getIssues() {
        return store.getIssues();
    }

    render() {
        renderIssueList(store.getIssues());
    }
}