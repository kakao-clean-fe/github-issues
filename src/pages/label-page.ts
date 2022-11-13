import { getApi } from '~/utils/api';
import { Labels } from '~/types/label';
import { initLabelPageLayout } from '~/components/label-page-layout';
import { initLabelListComponent } from '~/components/label-list';
import { initLabelCountComponent } from '~/components/label-count';
export const initLabelPage = async (): Promise<void> => {
  const labels = await getApi<Labels>({ url: '/data-sources/labels.json' });
  initLabelPageLayout();
  initLabelListComponent({ labels });
  initLabelCountComponent({ labels });
};
