const getData = async (fileName) => {
  const jsonData = await fetch(`/${fileName}`);
  return await jsonData.json();
};

export { getData };
