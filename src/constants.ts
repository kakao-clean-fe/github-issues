import { Status } from '../types';

export const STATUS: {
  OPEN: Status;
  CLOSE: Status;
} = {
  OPEN: 'open',
  CLOSE: 'close',
};

export const STATUS_STRING: {
  open: 'Opens';
  close: 'Closed';
} = {
  open: 'Opens',
  close: 'Closed',
};

export const API_METHOD = {
  GET: 'GET',
  POST: 'POST',
  DELETE: 'DELETE',
  UPDATE: 'UPDATE',
};
