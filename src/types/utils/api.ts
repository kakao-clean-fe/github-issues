export type Method = 'GET' | 'POST' | 'PUT' | 'DELETE';
export interface APIArgs {
  url: string
  method: Method
  headers?: object
  options?: object
  abort?: boolean
}
