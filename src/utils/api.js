import { asyncPipe, pipe } from "./fp";

export const request = (url) => asyncPipe(fetch, response => response.json())(url);