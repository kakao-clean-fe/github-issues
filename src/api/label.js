// For Delay Handling
let abortController = null;
let whileFetching = false;

const init = () => {
  if (whileFetching) {
    abortController.abort();
  }

  abortController = new AbortController();
  whileFetching = true;
};

const finish = () => {
  abortController = null;
  whileFetching = false;
};

const LabelApi = {
  async fetchLabels() {
    const res = await fetch('/labels');
    return res.json();
  },

  async fetchDelayLabels() {
    try {
      init();
      const res = await fetch('/labels-delay', {
        signal: abortController.signal,
      });
      finish();

      return res.json();
    } catch (error) {
      throw error;
    }
  },
};

export default LabelApi;
