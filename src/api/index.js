export const getFetchData = async (fileName) => {
  try{
    const response = await fetch(`../data-sources/${fileName}.json`);
    return await response.json();
  } catch(e){
    console.log(e);
  }
  return;
}
