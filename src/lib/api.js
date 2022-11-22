import {ClientError, ServerError} from "./errors.js";

export const get = async ({url, signal}) => {
    return await fetch(url, {signal})
        .then((response) => {
            return response.json()
        });
};

export const post = async ({url, data}) => {
    return await fetch(url, {
        method: 'POST',
        body: JSON.stringify(data)
    }).then((response) => {
        const statusCode = response.status
        if (ClientError.isOccurred(statusCode)) {
            throw new ClientError(statusCode)
        } else if (ServerError.isOccurred(statusCode)) {
            throw new ServerError(statusCode)
        }

        return response.json();
    });
}

export const handle = (promise) => {
    return promise.then((response) => ({error: null, response}))
        .catch((error) => ({error, response: null}))
}

function abortRequest() {
    const abortControllerMap = {}
    return function (url) {
        const controller = new AbortController();
        abortControllerMap[url]?.abort()
        abortControllerMap[url] = controller
        return get({url, signal: controller.signal})
            .then((data) => {
                    delete abortControllerMap.url
                    return data
                }
            )
    }
}

export const abort = abortRequest()
