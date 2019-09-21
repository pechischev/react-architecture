import { ITablePresenter } from "../presenters";

export interface IExampleController {
    fetchItems(): void;

    createItem(): void;

    showItem(index: number): void;

    getTablePresenter(): ITablePresenter<object>;
}
