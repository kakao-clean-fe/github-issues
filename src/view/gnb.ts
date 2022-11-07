import {$} from '../utils';
import {MainController} from "../controller/main";

export const GNB = (controller: MainController) => {
    const $issueBtn = $('.gnb > .btn-issue');
    const $labels = $('.gnb > .btn-label');

    if (!$issueBtn || !$labels) throw new Error('hmm.. something wrong');

    $issueBtn.addEventListener('click', () => controller.displayIssueView());
    $labels.addEventListener('click', () => controller.displayLabelView());
}