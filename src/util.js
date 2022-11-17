export const fetchData = async (fileName) => {
    const result = await fetch(`../data-sources/${fileName}.json`);
    return await result.json();
};