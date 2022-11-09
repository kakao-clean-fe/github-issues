import IssueView from "./view/issue";
import LabelView from './view/label';
import {GNB} from "./view/gnb";

(function() {
    const issueView = new IssueView();
    const labelView = new LabelView();
    GNB({issueView, labelView});
    issueView.attach();
})();
