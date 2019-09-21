import * as ReactDOM from "react-dom";
import * as React from "react";
import "./main.scss";
import { App } from "./App";

const app = new App();
app.initialize();

window.addEventListener("load", () => ReactDOM.render(app.render(), document.getElementById("root")));
