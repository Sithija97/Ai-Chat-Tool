export interface IError extends Error {
  message: string;
  name: string;
  kind: string;
  stack: any;
}
