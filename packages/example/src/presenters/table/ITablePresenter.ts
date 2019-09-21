import { ICell, IColumn, PluginMap } from "./interfaces";
import { ISelectPresenter } from "../selector";
import { IPlugin } from "./IPlugin";
import { ObservableStream } from "../../model";

export interface ITablePresenter<T> extends ISelectPresenter<T> {
    setData(data: T[]): void;
    getData(): T[];

    setColumns(columns: IColumn[]): void;
    getColumns(): IColumn[];

    getTableData(): ICell[][];

    setCount(count: number): void;
    getCount(): number;

    appendRow(row: T): void;
    removeRow(index: number): void;
    getRowByIndex(index: number): T | undefined;

    setPlugins(plugins: PluginMap): void;
    getPlugin(name: string): IPlugin | undefined;

    getDataChangeStream(): ObservableStream<T[]>;
}
