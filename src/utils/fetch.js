import {FetchError} from "../errors/fetchError.js";
import {FetchResult} from "../errors/fetchResult.js";
import {API_PATH} from "../consts/const.js";

export const fetchIssues = async () => fetchUtils(API_PATH.GET_ISSUES);

export const fetchLabels = async () => fetchUtils(API_PATH.GET_LABELS);

export const saveLabels = async (newLabel) => {
    return await fetchUtils(API_PATH.SAVE_LABELS, {
        method: "POST",
        body: JSON.stringify(newLabel)
    });
}

export const updateLabels = async (abortSignal) => fetchUtils(API_PATH.UPDATE_LABELS, {signal: abortSignal});

const fetchUtils = async (path, config = {method: 'GET'}) => {
    try {
        return new FetchResult(await fetch(path, config).then(resolveResponse).catch(rejectResponse));
    } catch (error) {
        return new FetchResult(undefined, error);
    }
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
    if (e instanceof FetchError) error = e;
    else {
        const ErrorMsg = e.name === 'AbortError' ? `[Abort Error] ${e}` : `[Request Error] ${e}`;
        error = new FetchError(ErrorMsg);
    }
    console.error(error);
    throw error;
}