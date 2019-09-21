import { IRequestManager } from "@mvp/core";
import { AxiosPromise } from "axios";

export class ExampleService {
    private readonly request: IRequestManager;

    constructor(request: IRequestManager) {
        this.request = request;
    }

    getItems(): AxiosPromise<object[]> {
        return new Promise(() => {});
    }
}
