import { getApi } from '~/utils/api';
import { Labels } from '~/types/label';
import { LabelList } from '~/components/label-list';
import { LabelPageLayout } from '~/components/label-page-layout';
import { LabelCount } from '~/components/label-count';
import { LabelForm } from '~/components/label-form';

export const initLabelPage = async (): Promise<void> => {
  const labels = await getApi<Labels>({ url: '/data-sources/labels.json' });
  new LabelPageLayout({ labelFormComponent: new LabelForm() }).init();
  new LabelList({ labels }).init();
  new LabelCount({ labels }).init();
};
