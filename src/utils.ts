import axios from 'axios';

export const $ = <T extends HTMLElement = HTMLElement> (selector: string, base: Element = document.body) => base.querySelector<T>(selector);
export const $$ = <T extends HTMLElement = HTMLElement> (selector: string, base: Element = document.body) => base.querySelectorAll<T>(selector);

export const readIssues = async () => {
    const { data } = await axios.get('/data-sources/issues.json', { responseType: 'json'});
    return data;
}

export const readLabels = async () => {
    const { data } = await axios.get('/data-sources/issues.json', { responseType: 'json'});
    return data;
}