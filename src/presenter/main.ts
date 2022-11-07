import model from '../models';
import {IssueViewType} from "../view/issue";
import {LabelViewType} from "../view/label";
import {readIssues, readLabels} from "../utils";

type Props = {
    issueView: IssueViewType;
    labelView: LabelViewType;
}

export type MainController = ReturnType<typeof mainController>;

export const mainController = ({issueView, labelView}: Props) => {
    const displayIssueView = () => {
        issueView.attach();
        issueView.updateApp(model.getResource('issues'));
    }

    const displayLabelView = () => {
        labelView.attach();
        labelView.updateApp((model.getResource('labels')));
    }

    return { displayIssueView, displayLabelView };
}