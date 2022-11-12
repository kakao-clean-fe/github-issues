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

// [To-Do] Labels 구현 하기
export const getLabelsData = (store) => {
  fetch("../data-sources/label.json")
    .then((response) => response.json())
    .then((resJson) => {
      console.log(resJson);
    })
    .catch((err) => {
      console.error("[getLabelsData]", err);
    });
};