import { ISSUES_URL, LABELS_URL, LABELS_DELAY_URL } from '../constants/api';
import { setLabelData } from '../store/dataStore';

export const fetchData = (url = '', init = {}) => fetch(url, init)
  .then(response => {
    if(response.ok) {
      return response.json();
    }
    return response.json().then(error => Promise.reject(error));
});

export const getIssuesData = () => fetchData(ISSUES_URL);

export const getLabelData = () => fetchData(LABELS_URL, {method: 'GET'});

export const addLabelData = (data) => fetchData(LABELS_URL, {
    method: 'POST',
    body: JSON.stringify(data),
  })
  .then(newLabelData => {
    setLabelData(newLabelData)
  })
  .catch(error => {
    console.error('error', error);
    alert('잠시 후 다시 시도해주세요.');
  });

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
    .then(updateLabelData => setLabelData(updateLabelData))
    .catch(() => {});
}
