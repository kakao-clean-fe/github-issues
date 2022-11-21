import { ISSUES_URL, LABELS_URL, LABELS_DELAY_URL } from '../constants/api';

export const fetchData = async (url = '', init = {}) => {
  const response = await fetch(url, init);

  return response.json();
};

export const getIssuesData = () => fetchData(ISSUES_URL);

export const getLabelData = () => fetchData(LABELS_URL, {method: 'GET'});

export const addLabelData = (data) => {
  return fetchData(LABELS_URL, {
    method: 'POST',
    body: JSON.stringify(data),
  })
  .catch(error => {
    console.log(error);
    alert('잠시 뒤 다시 시도해주세요.')
  });
};

let controller;
export const updateLabelData = () => {
  if (controller) {
    controller.abort();
    console.log('Abort Update Labels');
  }

  controller = new AbortController();
  const signal = controller.signal;

  return fetchData(LABELS_DELAY_URL, {
    method: 'GET',
    signal,
  })
    .catch(() => {});
}
