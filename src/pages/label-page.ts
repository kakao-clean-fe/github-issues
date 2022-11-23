import { LabelList } from '~/components/label-list';
import { LabelPageLayout } from '~/components/label-page-layout';
import { LabelCount } from '~/components/label-count';
import { LabelForm } from '~/components/label-form';
import { labelStore } from '~/store/label-store';

export const initLabelPage = (): void => {
  labelStore.fetchAndSetLabels();

  new LabelPageLayout().init();

  const labelList = new LabelList();
  labelList.init({ labels: labelStore.state.labels });
  labelStore.setLabelsWatcher(() => { labelList.render({ labels: labelStore.state.labels }); });

  const labelCount = new LabelCount();
  labelCount.init({ labels: labelStore.state.labels });
  labelStore.setLabelsWatcher(() => { labelCount.render({ labels: labelStore.state.labels }); });
};
