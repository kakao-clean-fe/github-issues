export const getIssuesData = async (store) => {
  try {
    const response = await fetch("../data-sources/issues.json");

    if (response) {
      const data = await response.json();
      if (data) {
        const prevStore = store.getStore();
        store.setStore({
          ...prevStore,
          issues: data,
        });
      }
    }
  } catch (err) {
    console.error("[getIssuesData]", err);
  }
};

export const getLabelsData = async () => {
  try {
    const response = await fetch("../data-sources/labels.json");

    if (response) {
      const data = await response.json();
      if (data) {
        return data;
      }
    }

    return [];
  } catch (err) {
    console.error("[getLabelsData]", err);
    return [];
  }
};