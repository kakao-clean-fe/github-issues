// eslint-disable-next-line @typescript-eslint/ban-types
export type Query = Record<'string', 'string'> | {};

export type Route = '/issue' | '/label';

type Hash = `#${string}`;

export type Path = Route | `${Route}${'?' | '#'}${string}` | `${Route}?${string}${Hash}`;

export interface PathObject {
  path: Path
  query?: Query
  hash?: Hash | ''
}
