import { IAuthStrategy } from "./IAuthStrategy";
import { IToken } from "../token";

export class JWTAuthStrategy implements IAuthStrategy {
    private readonly accessToken: string;
    private readonly refreshToken: string;

    constructor(token: IToken) {
        this.accessToken = token.accessToken;
        this.refreshToken = token.refreshToken;
    }

    getAuthData(): object {
        return {
            accessToken: this.accessToken,
            refreshToken: this.refreshToken
        };
    }
}
