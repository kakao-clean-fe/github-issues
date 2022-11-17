import { LabelList } from '~/components/label-list';
import { LabelPageLayout } from '~/components/label-page-layout';
import { LabelCount } from '~/components/label-count';
import { LabelForm } from '~/components/label-form';
import { labelStore } from '~/store/label-store';
import type { Labels } from '~/types/label';

export const initLabelPage = (): void => {
  labelStore.fetchAndSetLabels();

  new LabelPageLayout({ labelFormComponent: new LabelForm() }).init();

  const labelList = new LabelList();
  labelStore.setLabelsWatcher((labels: Labels) => { labelList.init({ labels }); });

  const labelCount = new LabelCount();
  labelStore.setLabelsWatcher((labels: Labels) => { labelCount.init({ labels }); });
};
