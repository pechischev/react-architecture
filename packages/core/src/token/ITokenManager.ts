import { IToken } from "./IToken";

export interface ITokenManager {
    getToken(): IToken | undefined;

    setToken(token: IToken): void;

    removeToken(): void;

    hasToken(): boolean;
}
