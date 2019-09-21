import * as React from "react";
import { HTMLAttributes } from "react";

interface ISelectedCellProps extends HTMLAttributes<HTMLTableCellElement> {
    selected: boolean;

    onChangeSelection(value: boolean): void;
}

export const SelectableCell = (props: ISelectedCellProps) => {
    const {selected, onChangeSelection} = props;
    return (
        <td className="cell cell_selectable">
            <input
                type={"checkbox"}
                checked={selected}
                onChange={(event) => {
                    const checked = event.target.checked;
                    onChangeSelection(checked);
                }}
            />
        </td>
    );
};
