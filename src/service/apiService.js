export const getIssuesData = async () => {
  try {
    const response = await fetch("/issues");

    if (response) {
        const data = await response.json();

        return data || [];
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

      return data || [];
    }

    return [];
  } catch (err) {
    console.error("[getLabelsData]", err);
    return [];
  }
};

export const getLabelsDataDelay = async (signal, controller) => {
  try {
    const response = await fetch("/labels-delay", {
      signal,
    });

    if (response) {
      const data = await response.json();
      controller.abort();
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

export const postLabelsData = async (data) => {
  try {
    const response = await fetch("/labels", {
      method: "POST",
      body: JSON.stringify(data)
    });

    if (!response) throw new Error('서버 응답시간이 초과되었습니다.')
    const resData = await response.json();
    
    if (!resData) throw new Error('서버 응답을 받아 올 수 없습니다.')
    if (response.status > 400) {
      alert(`서버 에러가 발생 하였습니다. : ${JSON.stringify(resData)}`);
      return null;
    }
    
    return resData;
  } catch (err) {
    console.error("[getLabelsData]", err);
    return null;
  }
};