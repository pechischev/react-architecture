import { ITablePresenter } from "./ITablePresenter";
import { PluginMap, IColumn, ICell } from "./interfaces";
import { IPlugin } from "./IPlugin";
import { get } from "lodash";
import { ISelectPresenter, SelectPresenter, ESelectionMode } from "../selector";
import { BehaviorSubject } from "rxjs";
import { ObservableStream } from "../../model";

interface TableBuildOptions {
    plugins?: PluginMap;
}

export class TablePresenter<T extends object> implements ITablePresenter<T>, ISelectPresenter<T> {
    protected readonly dataChanged$ = new BehaviorSubject<T[]>([]);
    protected readonly selector = new SelectPresenter<T>();
    private data: T[] = [];
    private columns: IColumn[] = [];
    private count = 0;
    private plugins: PluginMap = {};

    static build<T extends object>(options: TableBuildOptions = {}): ITablePresenter<T> {
        const { plugins } = options;
        const table = new TablePresenter<T>();
        if (plugins) {
            table.setPlugins(plugins);
        }
        return table;
    }

    constructor() {
        this.dataChanged$
            .subscribe( (data) => {
                this.selector.setItems(data);
                this.unselectAll();
            });
    }

    getDataChangeStream(): ObservableStream<T[]> {
        return this.dataChanged$;
    }

    setData(data: T[]): void {
        this.data = data.slice();
        this.dataChanged$.next(this.data);
    }

    getData(): T[] {
        return this.data;
    }

    setCount(count: number): void {
        this.count = count;
    }

    getCount(): number {
        return this.count;
    }

    appendRow(row: T): void {
        const hasRow = !!this.data.find((value) => Object.is(row, value));
        if (hasRow) {
            console.warn("This row already added: ");
            return;
        }
        this.data.push(row);
    }

    removeRow(index: number): void {
        const row = this.getRowByIndex(index);
        if (!row) {
            return;
        }
        this.data.splice(index, 1);
    }

    getRowByIndex(index: number): T | undefined {
        if (index < 0) {
            throw new Error("Index is out of range");
        }
        return this.data[index];
    }

    setColumns(columns: IColumn[]): void {
        this.columns = columns;
    }

    getColumns(): IColumn[] {
        return this.columns;
    }

    getTableData(): ICell[][] {
        return this.data
            .map((row) => {
                return this.columns.map(({field, options}) => ({
                    value: get(row, field),
                    options
                }));
            });
    }

    setPlugins(plugins: PluginMap): void {
        this.plugins = plugins;
    }

    getPlugin(name: string): IPlugin | undefined {
        return this.plugins[name];
    }

    select(indexes: number[], mode?: ESelectionMode): void {
        this.selector.select(indexes, mode);
    }

    selectAll(): void {
        this.selector.selectAll();
    }

    unselect(indexes: number[]): void {
        this.selector.unselect(indexes);
    }

    unselectAll(): void {
        this.selector.unselectAll();
    }

    isSelected(index: number): boolean {
        return this.selector.isSelected(index);
    }

    isSelectedAll(): boolean {
        return this.selector.isSelectedAll();
    }

    getSelection(): T[] {
        return this.selector.getSelection();
    }

    getSelectedIndexes(): number[] {
        return this.selector.getSelectedIndexes();
    }

    getSelectionChangeStream(): ObservableStream<number[]> {
        return this.selector.getSelectionChangeStream();
    }
}
