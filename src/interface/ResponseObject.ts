export interface ResponseObject {
  code: number;
  status: boolean;
  info: string;
  message?: string;
  data?: any;
}
