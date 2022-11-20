export const fetchIssues = async () => fetchUtils("/issues");

export const fetchLabels = async () => fetchUtils("/labels");

export const saveLabels = async (newLabel) => {
    return await fetchUtils("/labels", {
        method: "POST",
        body: JSON.stringify(newLabel)
    });
}

export const updateLabels = async (abortSignal) => fetchUtils("/labels-delay", {signal: abortSignal});

const fetchUtils = async (path, config = {method: 'GET'}) => {
    return await fetch(path, config).then(resolveResponse).catch(rejectResponse);
}

const resolveResponse = (response) => {
    return response.json()
        .then((data) => {
            if (response.ok) {
                return {status: response.status, headers: response.headers, data: data}
            } else {
                throw new FetchError(`[Fetch Error] response error: ${data?.error}`, response.status, data);
            }
        })
}

const rejectResponse = (e) => {
    let error;
    if(e instanceof FetchError) error = e;
    else {
        const ErrorMsg = e.name === 'AbortError' ? `[Abort Error] ${e}` : `[Request Error] ${e}`;
        error = new FetchError(ErrorMsg);
    }
    console.error(error);
    throw error;
}

export class FetchError extends Error {
    data;
    status;
    constructor(message = null, status = 0, data = null) {
        super(message);
        this.data = data;
        this.status = status;
    }

}