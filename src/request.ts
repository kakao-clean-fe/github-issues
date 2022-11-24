import axios from 'axios';
import { Issue, Label } from './types';

export type DelayRequestOption = {
    signal?: AbortSignal
}

const GET = <T> (url: string) => async ({ signal }: DelayRequestOption = { signal: undefined }) => {
    const { data } = await axios.get<T>(url, { responseType: 'json', signal });
    return data;
}

const POST = <T = any> (url: string) => async (json: any) => {
    const { data } = await axios.post<T>(url, json);
    return data;
}

export const readIssues = GET<Array<Issue>>('/issues');
export const readLabels = GET<Array<Label>>('/labels');
export const readDelaiedLabels = GET<Array<Label>>('/labels-delay');
export const updateLabels = POST('/labels');
