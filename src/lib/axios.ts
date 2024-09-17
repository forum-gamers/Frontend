import axios, { type AxiosInstance, type AxiosResponse } from "axios";
import type { BaseResponse } from "@/interfaces/request";

export interface Query {
  url: string;
  headers?: any;
  params?: any;
}

export interface Mutation {
  url: string;
  headers?: any;
  params?: any;
  method: "POST" | "PATCH" | "DELETE" | "PUT";
  data?: any;
}

class ThirdPartyRequest {
  private readonly client: AxiosInstance = axios.create({
    baseURL: process.env.BACKEND_BASE_URL,
    validateStatus: (s) => s >= 200,
    withXSRFToken: true,
  });

  public async Query<T = any>({
    url,
    headers,
    params,
  }: Query): Promise<AxiosResponse<BaseResponse<T>>> {
    const { signal } = new AbortController();
    return this.client<BaseResponse<T>>({
      url,
      headers,
      method: "GET",
      params,
      signal,
    });
  }

  public async Mutation<T = any>({
    url,
    headers,
    data,
    method,
    params,
  }: Mutation): Promise<AxiosResponse<BaseResponse<T>>> {
    const { signal } = new AbortController();
    return this.client<BaseResponse<T>>({
      url,
      headers,
      method,
      data,
      params,
      signal,
    });
  }
}

const request = new ThirdPartyRequest();

export default request;
