import { DeleteRequestOptions, GetRequestOptions, PostRequestOptions, PutRequestOptions } from "./interfaces";
import { AxiosResponse } from "axios";
import { IAuthStrategy } from "../auth";

export interface IRequestManager {
    get<R, P>(url: string, options?: GetRequestOptions<P>): Promise<AxiosResponse<R>>;

    post<R, T, P = {}>(url: string, options: PostRequestOptions<T, P>): Promise<AxiosResponse<R>>;

    put<T, P = {}>(url: string, options: PutRequestOptions<T, P>): Promise<AxiosResponse<void>>;

    delete<R, T, P = {}>(url: string, options?: DeleteRequestOptions<T, P>): Promise<AxiosResponse<R>>;

    setStrategy(strategy: IAuthStrategy): void;
}
