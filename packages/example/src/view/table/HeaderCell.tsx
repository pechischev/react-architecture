import { ICellOption } from "./interfaces";
import { HTMLAttributes } from "react";
import * as React from "react";
import classNames from "classnames";
import { IColumn, IOption } from "../../presenters";
import { EAlignType } from "../../model";

type HeaderCellProps = ICellOption<IColumn> & IOption & HTMLAttributes<HTMLTableDataCellElement>;

export const HeaderCell = (props: HeaderCellProps) => {
    const {value, align = EAlignType.LEFT, className, plugin, ...rest} = props;
    const classes = classNames("cell", `cell_${align}`, {
        [`${className}`]: !!className,
    });
    const {field, label} = value;
    return (
        <th className={classes} {...rest}>{!!label ? label : field}</th>
    );
};
