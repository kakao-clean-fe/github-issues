export const getIssuesData = async () => {
  try {
    const response = await fetch("../data-sources/issues.json");

    if (response) {
      const data = await response.json();
      data.map((issue) => {
        return issue;
      });
    }
  } catch (err) {
    console.error("[getIssuesData]", error);
  }
};

export const getLabelsData = () => {
  fetch("../data-sources/label.json")
    .then((response) => response.json())
    .then((resJson) => {
      console.log(resJson);
    })
    .catch((error) => {
      console.error("[getLabelsData]", error);
    });
};
