import { IRequestManager } from "@mvp/core";
import { AxiosPromise } from "axios";
import { ValidationErrors } from "final-form";

export class SurveyService {
    private readonly request: IRequestManager;

    constructor(request: IRequestManager) {
        this.request = request;
    }

    create(data: object): AxiosPromise<object> {
        return this.request.post("", {data});
    }

    updateById(id: number, data: object): AxiosPromise<void> {
        return this.request.put("", {data});
    }

    getById(id: number): AxiosPromise<object> {
        return this.request.get("", {});
    }

    loadReceipts(values: object): AxiosPromise<object[]> {
        return this.request.get("", {params: values});
    }

    validate(data: object): ValidationErrors {
        return {};
    }
}
