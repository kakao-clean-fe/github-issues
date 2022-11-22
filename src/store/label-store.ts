import { getApi } from '~/utils/api';
import { Labels } from '~/types/label';
import { ref, watch } from '~/utils/reactive';
import { unwrapRefValues } from '~/utils/store';
import { abortFetchController } from '~/utils/abort-fetch-controller';

const refObject = {
  labels: ref<Labels>([])
};

export const labelStore = {
  state: unwrapRefValues(refObject),

  setLabelsWatcher (effectFunction: (labels: Labels) => void) {
    watch(refObject.labels, effectFunction);
  },

  setLabels (labels: Labels) {
    this.state.labels = labels;
  },

  async fetchLabels (): Promise<Labels> {
    return await getApi<Labels>({ url: '/labels' });
  },

  async fetchLabelsWithDelay (): Promise<Labels> {
    const KEY = 'GET /labels-delay';
    if (abortFetchController.has(KEY)) {
      abortFetchController.abort(KEY);
    }
    const signal = abortFetchController.create(KEY).getSignal(KEY);

    return await getApi<Labels>({ url: '/labels-delay', options: { signal } });
  },

  fetchAndSetLabels ({ delay }: { delay: boolean } = { delay: false }) {
    const fetchFunction = delay
      ? this.fetchLabelsWithDelay
      : this.fetchLabels;

    fetchFunction()
      .then((labels: Labels) => { this.setLabels(labels); })
      .catch((error: Error) => {
        console.error(error);

        throw error;
      });
  }

};
