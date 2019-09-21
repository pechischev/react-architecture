import { FC } from "react";
import * as React from "react";
import "./Sidebar.scss";
import { NavLink } from "react-router-dom";
import { IAppLink } from "../../interfaces";

interface ISidebarProps {
    links: IAppLink[];
}

export const Sidebar: FC<ISidebarProps> = ({links}) => {
    return (
        <div className="app-sidebar">
            <div className="app-sidebar-links links">
                {links.map(({path, icon, label}, index) => (
                    <NavLink className="link" to={`/${path}`} activeClassName="link_active" key={index}>
                        <div className="link__icon">
                            <img src={icon.inactive} className="link__icon_inactive" alt=""/>
                            <img src={icon.active} className="link__icon_active" alt=""/>
                        </div>
                        <span className="link__label">{label}</span>
                    </NavLink>
                ))}
            </div>
        </div>
    );
};
