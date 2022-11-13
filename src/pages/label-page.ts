import { getApi } from '~/utils/api';
import { Labels } from '~/types/label';
import { initLabelListComponent } from '~/components/label-list';
import { initLabelCountComponent } from '~/components/label-count';
import { LabelPageLayout } from '~/components/label-page-layout';
export const initLabelPage = async (): Promise<void> => {
  const labels = await getApi<Labels>({ url: '/data-sources/labels.json' });
  new LabelPageLayout().init();
  initLabelListComponent({ labels });
  initLabelCountComponent({ labels });
};
