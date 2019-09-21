import { AxiosRequestConfig } from "axios";
import { IAuthStrategy } from "../auth";

type RequestParams<T> = T extends object ? T : URLSearchParams;

type CommonRequestOptions<T> = Pick<AxiosRequestConfig, "responseType"> & {params: RequestParams<T>};

export type RequestManagerConfig = Pick<AxiosRequestConfig, "headers" | "baseURL">;

export type GetRequestOptions<T = object> = Partial<CommonRequestOptions<T>>;
export type PostRequestOptions<R, T = object> = Partial<CommonRequestOptions<T> & {data: R}>;
export type PutRequestOptions<R, T  = object> = Partial<CommonRequestOptions<T> & {data: R}>;
export type DeleteRequestOptions<R, T = object> = Partial<CommonRequestOptions<T> & {data: R}>;

export type BuildOptions = Partial<RequestManagerConfig> & {strategy: IAuthStrategy};
