import { ESelectionMode } from "./interfaces";
import { ObservableStream } from "../../model";

export interface ISelectPresenter<T> {
    select(indexes: number[], mode?: ESelectionMode): void;
    unselect(indexes: number[]): void;

    selectAll(): void;
    unselectAll(): void;

    isSelected(index: number): boolean;
    isSelectedAll(): boolean;

    getSelection(): T[];
    getSelectedIndexes(): number[];

    getSelectionChangeStream(): ObservableStream<number[]>;
}
