import axios from 'axios';
import { Issue, Label } from './types';


export const readIssues = async () => {
    const { data } = await axios.get<Array<Issue>>('/data-sources/issues.json', { responseType: 'json'});
    return data;
}

export const readLabels = async () => {
    const { data } = await axios.get<Array<Label>>('/data-sources/labels.json', { responseType: 'json'});
    return data;
}