import {STATUS_LIST} from '../constants';

export const getStatusCount = (data) => {
  let result = {};
  const updateCountLogic = (count, currValue, status) => count + (currValue.status === status ? 1 : 0);
  const updateCount = (status) => data.reduce((count, currValue) => updateCountLogic(count, currValue, status), 0);
  STATUS_LIST.forEach(status => result[status] = updateCount(status));
  return result;
}

export const filterByStatus = (data, status) => {
  return data.filter(item => item.status === status);
}
