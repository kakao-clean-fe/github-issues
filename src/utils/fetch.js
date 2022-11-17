export const fetchIssues = async () => await ((await fetch("/issues")).json());

export const fetchLabels = async () => await ((await fetch("/labels")).json());

export const saveLabels = async (newLabel) => {
    const response = await fetch("/labels", {
        method: "POST",
        body: JSON.stringify(newLabel)
    }).catch((err) => console.log(`request error : ${err}`));
    const body = await response.json();
    if(response.status !== 201) throw new Error(body.error);
    return body;
}