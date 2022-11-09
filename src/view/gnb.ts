import {$} from '../utils';
import IssueView from "./issue";
import LabelView from "./label";

type Props = {
    issueView: IssueView;
    labelView: LabelView;
}

export const GNB = ({issueView, labelView}: Props) => {
    const $issueBtn = $('.gnb > .btn-issue');
    const $labels = $('.gnb > .btn-label');

    if (!$issueBtn || !$labels) throw new Error('hmm.. something wrong');

    $issueBtn.addEventListener('click', () => issueView.attach());
    $labels.addEventListener('click', () => labelView.attach());
}