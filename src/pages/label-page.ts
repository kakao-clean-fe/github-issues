import { getApi } from '~/utils/api';
import { Labels } from '~/types/label';
import { initLabelPageLayout } from '~/components/label-page-layout';
import { initLabelListComponent } from '~/components/label-list';

export const initLabelPage = async (): Promise<void> => {
  const labels = await getApi<Labels>({ url: '/data-sources/labels.json' });
  initLabelPageLayout();
  initLabelListComponent({ labels });
};
