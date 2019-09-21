import { IToken } from "./IToken";
import { isEmpty } from "lodash";
import { ITokenManager } from "./ITokenManager";

export class TokenLocalStorageManager implements ITokenManager {
    private static TOKEN_KEY = "token";

    getToken(): IToken | undefined {
        const token = localStorage.getItem(TokenLocalStorageManager.TOKEN_KEY);
        if (!token) {
            return void 0;
        }
        return JSON.parse(token);
    }

    setToken(token: IToken): void {
        localStorage.setItem(TokenLocalStorageManager.TOKEN_KEY, JSON.stringify(token));
    }

    removeToken(): void {
        localStorage.removeItem(TokenLocalStorageManager.TOKEN_KEY);
    }

    hasToken(): boolean {
        return !isEmpty(this.getToken());
    }
}
