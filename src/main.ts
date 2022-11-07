import {IssueView} from "./view/issue";
import {LabelView} from './view/label';
import model from './models';
import {mainController} from "./controller/main";
import {GNB} from "./view/gnb";

const main = () => {
    const issueView = IssueView();
    const labelView = LabelView();
    const state = model({ issueView, labelView });
    const manager = mainController({issueView,labelView, model: state});
    GNB(manager);

    manager.displayIssueView();
}

main();
