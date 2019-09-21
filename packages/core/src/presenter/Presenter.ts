import { IHistoryManager } from "../history-manager";
import { IRequestManager } from "../request";

export abstract class Presenter {
    protected readonly historyManager: IHistoryManager;
    protected readonly requestManager: IRequestManager;

    constructor(history: IHistoryManager, request: IRequestManager) {
        this.historyManager = history;
        this.requestManager = request;
    }
}
