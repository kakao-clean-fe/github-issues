import { getApi } from '~/utils/api';
import { Labels } from '~/types/label';
import { ref, watch } from '~/utils/reactive';

const state = {
  labels: ref<Labels>([])
};

export const labelStore = {
  get labels () {
    return state.labels.value;
  },

  set labels (newLabels: Labels) {
    state.labels.value = newLabels;
  },

  setLabelsWatcher (effectFunction: (labels: Labels) => void) {
    watch(state.labels, effectFunction);
  },

  async fetchLabels (): Promise<Labels> {
    return await getApi<Labels>({ url: '/data-sources/labels.json' });
  },

  fetchAndSetLabels () {
    this.fetchLabels()
      .then((labels: Labels) => { this.labels = labels; })
      .catch((error: Error) => error);
  }

};
