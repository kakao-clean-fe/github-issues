export const $ = <T extends HTMLElement = HTMLElement> (selector: string, base: Element | null = document.body) => (base ?? document).querySelector<T>(selector);
export const $$ = <T extends HTMLElement = HTMLElement> (selector: string, base: Element | null = document.body) => (base ?? document).querySelectorAll<T>(selector);

export const pipe = (...functions: Array<Function>) => (args: any) => functions.reduce((args, nextFn) => nextFn(args), args);
