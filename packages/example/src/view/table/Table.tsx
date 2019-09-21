import { ReactChild, TableHTMLAttributes, Fragment, useEffect, useState } from "react";
import * as React from "react";
import "./Table.scss";
import { HeaderCell } from "./HeaderCell";
import { TableRow } from "./TableRow";
import { ESelectionMode } from "../../presenters/selector";
import { BodyCell } from "./BodyCell";
import { SelectableCell } from "./SelectableCell";
import { ICell, ITablePresenter } from "../../presenters/table";

function renderBodyCellByRow<T>(row: ICell[]): ReactChild {
    return (
        <Fragment>
            {
                row.map((cellValue, key) => (
                    <BodyCell value={cellValue.value} key={key} {...cellValue.options} />
                ))
            }
        </Fragment>
    );
}

interface ITableProps<T> extends TableHTMLAttributes<HTMLTableElement> {
    presenter: ITablePresenter<T>;
    selection?: boolean;

    onClickRow?(index: number): void;
}

export const Table = <T extends object>(props: ITableProps<T>) => {
    const { presenter, selection = true, onClickRow, ...rest } = props;
    const columns = presenter.getColumns();
    const data = presenter.getTableData();
    const [selectedIndexes, setSelectedIndexes] = useState<number[]>(presenter.getSelectedIndexes());

    function toggleAll(value: boolean): void {
        value ? presenter.selectAll() : presenter.unselectAll();
    }

    useEffect(() => {
        const subscriber = presenter.getSelectionChangeStream().subscribe(setSelectedIndexes);
        return () => subscriber.unsubscribe();
    }, []);

    return (
        <table className="table" {...rest}>
            <thead className="table-header">
            <TableRow className="row-heading">
                <SelectableCell
                    selected={presenter.isSelectedAll()}
                    onChangeSelection={toggleAll}
                />
                {
                    columns.map((value, index) => (
                        <HeaderCell value={value} key={index} className="cell-heading" {...value.options}/>
                    ))
                }
            </TableRow>
            </thead>
            <tbody className="table-body">
            {
                data.map((row, index) => (
                    <TableRow className="body-row" key={index} onClick={() => onClickRow && onClickRow(index)}>
                        <SelectableCell
                            selected={selectedIndexes.includes(index)}
                            onChangeSelection={() => presenter.select([index], ESelectionMode.MULTIPLE)}
                        />
                        {renderBodyCellByRow(row)}
                    </TableRow>
                ))
            }
            </tbody>
        </table>
    );
};
