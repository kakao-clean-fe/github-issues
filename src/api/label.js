// For Delay Handling
let abortController = null;
let whileFetching = false;

const startRequest = () => {
  if (whileFetching) {
    abortController.abort();
  }

  abortController = new AbortController();
  whileFetching = true;
};

const finishResponse = () => {
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
      startRequest();
      const res = await fetch('/labels-delay', {
        signal: abortController.signal,
      });
      finishResponse();

      return res.json();
    } catch (error) {
      throw error;
    }
  },
  async postLabels(params) {
    try {
      const res = await fetch('/labels', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(params),
      });

      if (res.status >= 400) {
        throw {
          status: res.status,
        };
      }

      return res.json();
    } catch (error) {
      console.error(`${error.status} 에러 발생`);

      throw {
        message: '잠시 뒤 다시 시도해 주세요',
      };
    }
  },
};

export default LabelApi;
