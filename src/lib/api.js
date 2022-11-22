export const get = async (url) => {
    return await fetch(url).then((response) => {
        return response.json();
    });
};

export const post = async ({url, data}) => {
    return await fetch(url, {
        method: 'POST',
        body: JSON.stringify(data)
    }).then((response) => {
        return response.json();
    });
}
