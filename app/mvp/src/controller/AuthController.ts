import { EAppPaths } from "../model";
import { IHistoryManager } from "@mvp/core";
import { ITokenManager } from "@mvp/core";
import { AuthService } from "../services";
import { Presenter, IRequestManager } from "@mvp/core";
import { ValidationErrors } from "final-form";

export class AuthController extends Presenter {
    private readonly service: AuthService;
    private readonly tokenManager: ITokenManager;

    constructor(tokenManager: ITokenManager, history: IHistoryManager, request: IRequestManager) {
        super(history, request);

        this.tokenManager = tokenManager;
        this.service = new AuthService(request);
    }

    signIn(data: object): void {
        this.service.authenticate(data)
            .then((response) => {
                const { accessToken, refreshToken } = response.data as { accessToken: string, refreshToken: string };
                this.tokenManager.setToken({ accessToken, refreshToken });
                this.historyManager.redirect(EAppPaths.CONTENT);
            });
    }

    authenticated(): boolean {
        return !!this.tokenManager.getToken();
    }

    validate(data: object): ValidationErrors {
        return this.service.validate(data);
    }

    logout(): void {
        this.tokenManager.removeToken();
        this.historyManager.redirect(EAppPaths.SIGN_IN);
    }
}
