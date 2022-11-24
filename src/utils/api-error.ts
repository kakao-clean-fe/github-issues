
const STATUS_CODE = {
  UNAUTHORIZED: 401,
  FORBIDDEN: 403,
  INTERNAL_SERVER_ERROR: 500
} as const;

const AUTH_ERROR_CODE: number[] = [STATUS_CODE.UNAUTHORIZED, STATUS_CODE.FORBIDDEN];

const ERROR_MESSAGE = {
  [STATUS_CODE.UNAUTHORIZED]: '로그인이 필요합니다.',
  [STATUS_CODE.FORBIDDEN]: '권한이 없습니다.',
  SERVER_ERROR: '서버 에러가 발생하였습니다. 에러 반복 발생시, 담당자에게 연락 부탁드립니다.',
  NETWORK_ERROR: '네트워크가 불안정합니다.'
} as const;

const isNetworkError = (error: Response | Error): boolean => 'message' in error && error.message.includes('Failed to fetch');
const isFetchError = (error: Response | Error): error is Response => !!('status' in error);
const isServerError = (error: Response | Error): error is Response => isFetchError(error) && error.status >= STATUS_CODE.INTERNAL_SERVER_ERROR;
const isAuthError = (error: Response | Error): error is Response => isFetchError(error) && AUTH_ERROR_CODE.includes(error.status);

const getErrorMesage = (error: Response | Error) => {
  if (isServerError(error)) {
    return ERROR_MESSAGE.SERVER_ERROR;
  } else if (isAuthError(error)) {
    // TODO: 타입 에러 처리를 위한 임시 keyof typeof ERROR_MESSAGE, 개선 필요
    return ERROR_MESSAGE[error.status as keyof typeof ERROR_MESSAGE] as string | undefined;
  } else if (isNetworkError(error)) {
    return ERROR_MESSAGE.NETWORK_ERROR;
  }
  return undefined;
};

export const fetchErrorHandler = (error: Response | Error) => {
  const errorMessage = getErrorMesage(error);
  if (errorMessage) {
    alert(errorMessage);
  }
};

export const isHandledError = (error: Error | Response): boolean =>
  isServerError(error) ||
  isAuthError(error) ||
  isNetworkError(error);
