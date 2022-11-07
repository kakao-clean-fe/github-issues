import { ApiArgs, Method } from '~/types/utils/api';

const baseFetch = async <T>({ url, headers = {}, options = {}, method }: ApiArgs): Promise<T> => {
  const response = await fetch(url, {
    method,
    headers: {
      'Content-Type': 'application/json',
      ...headers
    },
    ...options
  });

  return await (response.json() as Promise<T>);// parses JSON response into native JavaScript objects
};

const setMethod = (method: Method) => async <T>(args: Omit<ApiArgs, 'method'>): Promise<T> => await baseFetch({ method, ...args });

export const getApi = setMethod('GET');
export const postApi = setMethod('POST');
export const putApi = setMethod('PUT');
export const deleteApi = setMethod('DELETE');
