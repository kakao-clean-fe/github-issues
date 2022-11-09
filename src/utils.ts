import axios from 'axios';
import { Issue, Label } from './types';

export const $ = <T extends HTMLElement = HTMLElement> (selector: string, base: Element = document.body) => base.querySelector<T>(selector);
export const $$ = <T extends HTMLElement = HTMLElement> (selector: string, base: Element = document.body) => base.querySelectorAll<T>(selector);

export const pipe = (...functions: Array<Function>) => (args: any) => functions.reduce((args, nextFn) => nextFn(args), args);

export const readIssues = async () => {
    const { data } = await axios.get<Array<Issue>>('/data-sources/issues.json', { responseType: 'json'});
    return data;
}

export const readLabels = async () => {
    const { data } = await axios.get<Array<Label>>('/data-sources/labels.json', { responseType: 'json'});
    return data;
}