export type BaseResponse<T = any> = {
  data: T;
  message?: string;
  code: number;
};

export interface BaseQuery {
  page?: number;
  limit?: number;
}
