export const getIssuesData = async (store) => {
  try {
    const response = await fetch("/issues");

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
    const response = await fetch("/labels");

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

export const getLabelsDataDelay = async () => {
  try {
    const response = await fetch("/labels-delay");

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

export const postLabelsData = async (options) => {
  try {
    const response = await fetch("/labels", {
      method: 'POST',
      ...options
    });

    if (response) {
      const data = await response.json();
      if (data) {
        return data;
      }
    }


  } catch (err) {
    console.error("[getLabelsData]", err);
    return [];
  }
};