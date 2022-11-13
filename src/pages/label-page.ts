import { getApi } from '~/utils/api';
import { Labels } from '~/types/label';
import { initLabelCountComponent } from '~/components/label-count';
import { LabelList } from '~/components/label-list';
import { LabelPageLayout } from '~/components/label-page-layout';
export const initLabelPage = async (): Promise<void> => {
  const labels = await getApi<Labels>({ url: '/data-sources/labels.json' });
  new LabelPageLayout().init();
  new LabelList({ labels }).init();
  initLabelCountComponent({ labels });
};
