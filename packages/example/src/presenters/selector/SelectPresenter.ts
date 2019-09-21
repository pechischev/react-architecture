import { ESelectionMode } from "./interfaces";
import { ISelectPresenter } from "./ISelectPresenter";
import { isEqual } from "lodash";
import { Subject } from "rxjs";
import { ObservableStream } from "../../model";

export class SelectPresenter<T> implements ISelectPresenter<T> {
    protected readonly selectionChanged$ = new Subject<number[]>();
    private items: T[] = [];
    private selectedIndexes: number[] = [];

    setItems(items: T[]): void {
        this.items = items;
    }

    select(indexes: number[], mode: ESelectionMode = ESelectionMode.SIMPLE): void {
        const isCorrectIndexes =  indexes.every((index: number) => !!this.items[index]);
        if (!isCorrectIndexes) {
            throw new Error("Index(es) is out of range");
        }
        let selection = indexes.slice();
        const isMultiple = mode === ESelectionMode.MULTIPLE;
        if (isMultiple) {
            const removed = indexes.filter((index) => this.isSelected(index));
            const added = indexes.filter((index) => !this.isSelected(index));
            const isRemoved = (index: number) => !removed.includes(index);
            selection = [...this.selectedIndexes, ...added].filter(isRemoved);
        }
        if (isEqual(this.selectedIndexes, selection)) {
            return;
        }
        this.selectedIndexes = selection;
        this.triggerUpdateSelection();
    }

    selectAll(): void {
        const indexes = this.items.map((_, index) => index);
        this.select(indexes);
    }

    unselectAll(): void {
        this.selectedIndexes = [];
        this.triggerUpdateSelection();
    }

    unselect(indexes: number[]): void {
        this.selectedIndexes = this.selectedIndexes.filter((index) => !indexes.includes(index));
        this.triggerUpdateSelection();
    }

    isSelected(index: number): boolean {
        return this.selectedIndexes.includes(index);
    }

    isSelectedAll(): boolean {
        return isEqual(this.items, this.getSelection());
    }

    getSelection(): T[] {
        return this.items.filter((value, index) => this.selectedIndexes.includes(index));
    }

    getSelectedIndexes(): number[] {
        return this.selectedIndexes;
    }

    getSelectionChangeStream(): ObservableStream<number[]> {
        return this.selectionChanged$;
    }

    private triggerUpdateSelection(): void {
        this.selectionChanged$.next(this.selectedIndexes);
    }
}
