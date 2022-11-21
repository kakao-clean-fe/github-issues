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
  return;
}
