export type BaseResponse<T = any> = {
  data: T;
  message?: string;
  code: number;
  Path: string;
};

export interface BaseQuery {
  page?: number;
  limit?: number;
}
