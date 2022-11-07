import {Model} from '../models';
import {IssueViewType} from "../view/issue";
import {LabelViewType} from "../view/label";

type Props = {
    issueView: IssueViewType;
    labelView: LabelViewType;
    model: Model;
}

export type MainController = ReturnType<typeof mainController>;

export const mainController = ({issueView, labelView, model}: Props) => {
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