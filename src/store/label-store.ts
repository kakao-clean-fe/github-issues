import { getApi } from '~/utils/api';
import { Labels } from '~/types/label';
import { ref, watch } from '~/utils/reactive';
import { unwrapRefValues } from '~/utils/store';

const refObject = {
  labels: ref<Labels>([])
};

export const labelStore = {
  state: unwrapRefValues(refObject),

  setLabelsWatcher (effectFunction: (labels: Labels) => void) {
    watch(refObject.labels, effectFunction);
  },

  async fetchLabels (): Promise<Labels> {
    return await getApi<Labels>({ url: '/data-sources/labels.json' });
  },

  fetchAndSetLabels () {
    this.fetchLabels()
      .then((labels: Labels) => { this.state.labels = labels; })
      .catch((error: Error) => error);
  }

};
