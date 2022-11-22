import { getApi } from '~/utils/api';
import { Labels } from '~/types/label';
import { ref, watch } from '~/utils/reactive';
import { unwrapRefValues } from '~/utils/store';

const refObject = {
  labels: ref<Labels>([])
};

interface Controller {
  labelWithDelay: AbortController | undefined
}
const fetchController: Controller = {
  labelWithDelay: undefined
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

  async fetchLabelsWithDelay ({ controller }: { controller: AbortController | undefined }): Promise<Labels> {
    if (controller) {
      controller.abort();
    }
    fetchController.labelWithDelay = new AbortController();
    const signal = fetchController.labelWithDelay.signal;

    return await getApi<Labels>({ url: '/labels-delay', options: { signal } });
  },

  fetchAndSetLabels ({ delay }: { delay: boolean } = { delay: false }) {
    const fetchFunction = delay
      ? () => this.fetchLabelsWithDelay({ controller: fetchController.labelWithDelay })
      : this.fetchLabels;

    fetchFunction()
      .then((labels: Labels) => { this.setLabels(labels); })
      .catch((error: Error) => {
        console.error(error);

        throw error;
      });
  }

};
