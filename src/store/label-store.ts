import { getAPI } from '~/utils/api';
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

  setLabels (labels: Labels) {
    this.state.labels = labels;
  },

  async fetchLabels (): Promise<Labels> {
    return await getAPI<Labels>({ url: '/labels' });
  },

  async fetchLabelsWithDelay (): Promise<Labels> {
    return await getAPI<Labels>({ url: '/labels-delay', abort: true });
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
