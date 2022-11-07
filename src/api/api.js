const getData = async (fileName) => {
  const jsonData = await fetch(`../data-sources/${fileName}.json`);
  return await jsonData.json();
};

export { getData };
