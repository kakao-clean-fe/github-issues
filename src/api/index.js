import { INTERNAL_SERVER_ERROR_CODE } from "../constants/status";

export const getFetchData = async (fileName) => {
  try{
    const response = await fetch(`../data-sources/${fileName}.json`);
    return await response.json();
  } catch(e){
    console.log(e);
    return [];
  }
  return;
}

export const getDataFromMSW = async (path) => {
  try{
    const response = await fetch(path);
    return await response.json();
  } catch(e){
    console.log(e);
    return [];
  }
}

export const postDataToMSW = async (path, data) => {
  try{
    const response = await fetch(path, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    if (response.status === INTERNAL_SERVER_ERROR_CODE) {
      const error = await response.json();
      console.log(error.error);
      alert('새로운 라벨 생성에 실패했습니다.');
      return null;
    }
    return await response.json();
  } catch(e){
    if(e.status === INTERNAL_SERVER_ERROR_CODE){
      alert('error');
    }
    return null;
  }
  return;
}
