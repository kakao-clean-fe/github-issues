import { ISSUES_URL, LABELS_URL } from '../constants/api';

export const fetchData = (url) => fetch(url).then(res => res.json());

export const fetchIssuesData = () => fetchData(ISSUES_URL);

export const getData = async (url = '') => {
  const response = await fetch(url, {
    method: 'GET',
  });

  return response.json();
};

export const postData = async (url = '', data = {}) => {
  const response = await fetch(url, {
    method: 'POST',
    body: JSON.stringify(data),
  });

  return response.json();
}

export const getLabelData = () => getData(LABELS_URL);

export const addLabelData = (data) => postData(LABELS_URL, data);
