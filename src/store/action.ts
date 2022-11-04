import { SERVER_URL } from '~/env';
import { getApi } from '~/utils/api';
import { Issue } from '~/types/issue';

export const getIssues = async (): Promise<Issue> => {
  const PATH = '/data-sources/issues.json';

  return await getApi<Issue>({ url: `${SERVER_URL}${PATH}` });
};
