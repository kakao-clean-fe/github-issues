const LabelApi = {
  async fetchLabels() {
    const res = await fetch('/labels');
    return res.json();
  },
};

export default LabelApi;
