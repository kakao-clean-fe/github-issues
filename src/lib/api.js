export const get = async (url) => {
    return await fetch(url).then((response) => {
        return response.json();
    });
};
