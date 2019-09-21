import { FC } from "react";
import * as React from "react";
import "./Submenu.scss";
import { NavLink } from "react-router-dom";
import { ILink } from "@mvp/core";

interface ISubmenuProps {
    title: string;
    paths: ILink[];
}

export const Submenu: FC<ISubmenuProps> = ({title, paths}) => {
    return (
        <div className="submenu">
            <div className="submenu__title">{title}</div>
            {paths.map(({label, path}, index) => (
                <NavLink
                    key={index}
                    to={`/${path}`}
                    className="submenu__link"
                    activeClassName="submenu__link_active"
                >
                    {label}
                </NavLink>
            ))}
        </div>
    );
};
