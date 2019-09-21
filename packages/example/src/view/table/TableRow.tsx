import classNames from "classnames";
import * as React from "react";
import { HTMLAttributes } from "react";

type RowWrapperProps = HTMLAttributes<HTMLTableRowElement>;

export const TableRow = (props: RowWrapperProps) => {
    const {className, children, ...rest} = props;
    const classes = classNames("row", {
        [`${className}`]: !!className,
    });
    return (
        <tr className={classes} {...rest}>
            {children}
        </tr>
    );
};
