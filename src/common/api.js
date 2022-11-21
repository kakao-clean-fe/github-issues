import { ISSUES_URL, LABELS_URL, LABELS_DELAY_URL } from '../constants/api';

export const fetchData = async (url = '', init = {}) => {
  const response = await fetch(url, init);

  return response.json();
};

export const fetchIssuesData = () => fetchData(ISSUES_URL);

export const getLabelData = () => fetchData(LABELS_URL, {method: 'GET'});

export const addLabelData = (data) => postData(LABELS_URL, {
  method: 'POST',
  body: JSON.stringify(data),
});
