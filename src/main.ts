import IssueView from "./view/issue";
import LabelView from './view/label';
import {GNB} from "./view/gnb";
import { worker } from './mocks/browser';

(function() {
    worker.start().then((() => {
        const issueView = new IssueView();
        const labelView = new LabelView();
        GNB({issueView, labelView});
        labelView.attach();
    }));
})();