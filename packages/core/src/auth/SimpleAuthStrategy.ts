import { IAuthStrategy } from "./IAuthStrategy";

export class SimpleAuthStrategy implements IAuthStrategy {
    getAuthData(): object {
        return {};
    }
}
