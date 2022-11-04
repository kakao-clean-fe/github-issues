import { ApiArgs } from '~/types/utils/api';

export const getApi = async <T>({ url, headers = {}, options = {} }: ApiArgs): Promise<T> => {
  // Default options are marked with *
  const response = await fetch(url, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      ...headers
    },
    ...options
  });

  return await (response.json() as Promise<T>);// parses JSON response into native JavaScript objects
};
