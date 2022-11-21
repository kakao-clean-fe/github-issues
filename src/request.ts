import axios from 'axios';
import { Issue, Label } from './types';

const request = <T> (url: string) => async () => {
    const { data } = await axios.get<T>(url, { responseType: 'json' });
    return data;
}

export const readIssues = request<Array<Issue>>('/data-sources/issues.json');
export const readLabels = request<Array<Label>>('/data-sources/labels.json');
