import * as React from "react";
import { HTMLAttributes } from "react";
import { ICellOption } from "./interfaces";
import classNames from "classnames";
import { CellValue, IOption } from "../../presenters";
import { EAlignType } from "../../model";

type ContentCellProps = ICellOption<CellValue> & IOption & HTMLAttributes<HTMLTableDataCellElement>;

export const BodyCell = (props: ContentCellProps) => {
    const { value, align = EAlignType.LEFT, className, ...rest } = props;
    const classes = classNames("cell", `cell_${align}`, {
        [`${className}`]: !!className,
    });
    return (
        <td className={classes} {...rest}>
            {value}
        </td>
    );
};
