import { IHistoryManager } from "./IHistoryManager";
import { IHistory } from "./IHistory";

export class HistoryManager implements IHistoryManager {
    private readonly history: IHistory;

    constructor(history: IHistory) {
        this.history = history;
    }

    redirect(path: string): void {
        this.history.push(`/${path}`);
    }
}
