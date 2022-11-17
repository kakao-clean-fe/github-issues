const LabelApi = {
  async fetchLabels() {
    const res = await fetch('../../data-sources/labels.json');
    return res.json();
  },
};

export default LabelApi;
