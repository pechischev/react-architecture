import { IRequestManager } from "@mvp/core";
import { AxiosPromise } from "axios";
import { EAuthField } from "../model";
import { ValidationErrors } from "final-form";
import { set } from "lodash";

export class AuthService {
    private readonly request: IRequestManager;

    constructor(request: IRequestManager) {
        this.request = request;
    }

    authenticate(data: object): AxiosPromise<object> {
        return this.request.post("", { data });
    }

    validate(data: object): ValidationErrors {
        const {login, password} = data as { login: string, password: string };
        const errors = {};
        if (!login) {
            set(errors, EAuthField.LOGIN, "required");
        }
        if (!password) {
            set(errors, EAuthField.PASSWORD, "required");
        }
        return errors;
    }
}
