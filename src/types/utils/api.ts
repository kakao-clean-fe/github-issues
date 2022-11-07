export type Method = 'GET' | 'POST' | 'PUT' | 'DELETE';
export interface ApiArgs {
  url: string
  method: Method
  headers?: object
  options?: object
}
