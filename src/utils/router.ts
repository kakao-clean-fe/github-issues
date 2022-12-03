import type { Path, Query, PathObject } from '~/types/utils/router';

const getQueryDelimiter = (url: string): '&' | '?' => url.includes('?') ? '&' : '?';

const makeQueryString = ({ path, query }: { path: Path, query: Query }): string => {
  const makeEncodedQuery = ([key, value]: [key: string, value: string]): string =>
    `${encodeURIComponent(key)}=${encodeURIComponent(value)}`;
  const queryString = Object.entries(query).map(makeEncodedQuery).join('&');

  return getQueryDelimiter(path) + queryString;
};

const makeRelativeUrl = ({ path, query, hash = '' }: PathObject): string =>
   `${path}${query ? makeQueryString({ path, query }) : ''}${hash}`;

export const router = {
  push (param: PathObject | Path) {
    if (typeof param === 'string') {
      history.pushState({}, '', param);
    } else {
      history.pushState({}, '', makeRelativeUrl(param));
    }
  },
  move (param: PathObject | Path) {
    if (typeof param === 'string') {
      window.location.assign(param);
    } else {
      window.location.assign(makeRelativeUrl(param));
    }
  },
  getPath () {
    return location.pathname;
  }
};
