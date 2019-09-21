import axios, { AxiosError, AxiosResponse } from "axios";
import {
    BuildOptions,
    DeleteRequestOptions,
    GetRequestOptions,
    PostRequestOptions,
    PutRequestOptions,
    RequestManagerConfig,
} from "./interfaces";
import { IRequestManager } from "./IRequestManager";
import { IAuthStrategy } from "../auth";

export class AxiosRequestManager implements IRequestManager {
    private instance = axios.create();
    private baseUrl = "";
    private headers = {};
    private strategy?: IAuthStrategy;

    static create(options: BuildOptions): IRequestManager {
        const { baseURL = "", headers, strategy } = options;
        const manager = new AxiosRequestManager();
        manager.setBaseUrl(baseURL);
        manager.setHeaders(headers);
        manager.setStrategy(strategy);
        return manager;
    }

    constructor() {
        this.init();
    }

    get<R, P>(url: string, options: GetRequestOptions<P> = {}): Promise<AxiosResponse<R>> {
        return this.instance.get(url, { ...this.getConfig(), ...options });
    }

    post<R, T, P = {}>(url: string, options: PostRequestOptions<T, P>): Promise<AxiosResponse<R>> {
        const { data, ...rest } = options;
        return this.instance.post(url, data, { ...this.getConfig(), ...rest });
    }

    put<T, P = {}>(url: string, options: PutRequestOptions<T, P>): Promise<AxiosResponse<void>> {
        const { data, ...rest } = options;
        return this.instance.put(url, data, { ...this.getConfig(), ...rest });
    }

    delete<R, T, P = {}>(url: string, options: DeleteRequestOptions<T, P> = {}): Promise<AxiosResponse<R>> {
        return this.instance.delete(url, { ...this.getConfig(), ...options });
    }

    setHeaders(headers: object): void {
        this.headers = headers;
    }

    setBaseUrl(url: string): void {
        this.baseUrl = url;
    }

    setStrategy(strategy: IAuthStrategy): void {
        this.strategy = strategy;
    }

    private getConfig(): RequestManagerConfig {
        const authData = !!this.strategy ? this.strategy.getAuthData() : {};
        return {
            baseURL: this.baseUrl,
            headers: {
                ...this.headers,
                ...authData
            },
        };
    }

    private init(): void {
        this.instance.interceptors.response.use(this.onFulfilled.bind(this), this.onRejected.bind(this));
    }

    private onFulfilled<T>(response: T): T {
        console.info("[RequestManager]", response);
        return response;
    }

    private onRejected<T>(error: AxiosError | Error): Promise<void> {
        return Promise.reject(error);
    }
}
