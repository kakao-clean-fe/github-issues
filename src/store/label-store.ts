import { getAPI, postAPI } from '~/utils/api';
import { ref, watch } from '~/utils/reactive';
import { unwrapRefValues } from '~/utils/store';
import type { Labels, Label } from '~/types/label';

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

  async fetchSubmitLabel (label: Label) {
    return await postAPI<Labels>({ url: '/label', options: { body: label } });
  },

  async fetchLabels () {
    return await getAPI<Labels>({ url: '/labels' });
  },

  async fetchLabelsWithDelay () {
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
