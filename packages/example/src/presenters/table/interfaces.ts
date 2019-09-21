import { IPlugin } from "./IPlugin";
import { EAlignType } from "../../model";

export interface ITableEventHandlers {
    onClick?(): void;
    onDoubleClick?(): void;
    onMouseEnter?(): void;
    onMouseLeave?(): void;
    onContextMenu?(): void;
}

export interface IOption {
    events?: ITableEventHandlers;
    align?: EAlignType;
    plugin?: object;
}

export interface IColumn {
    label?: string;
    field: string;
    options?: IOption;
}

export interface ICell {
    value: CellValue;
    options?: IOption;
}

export type CellValue = string | number | object;
export type PluginMap = {[K in string]: IPlugin};
