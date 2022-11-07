import {STATUS_LIST} from '../constants';

export const getStatusCount = (data) => {
  let result = {};
  STATUS_LIST.forEach(status => result[status] = data.reduce((count, currValue) => count + (currValue.status === status ? 1 : 0), 0));
  return result;
}

export const filterByStatus = (data, status) => {
  return data.filter(item => item.status === status);
}