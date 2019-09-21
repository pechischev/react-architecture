import * as React from "react";
import { FC } from "react";
import "./Content.scss";

export const Content: FC = ({ children }) => (
    <div className="app-content">
        {children}
    </div>
);
