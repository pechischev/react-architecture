import * as ReactDOM from "react-dom";
import * as React from "react";
import { Example } from "./Example";
import "./main.scss";
import { createBrowserHistory } from "history";
import { AxiosRequestManager, HistoryManager, Config, SimpleAuthStrategy } from "@mvp/core";

const history = createBrowserHistory();
const historyManager = new HistoryManager(history);
const { serverUrl } = Config;
const requestManager = AxiosRequestManager.create({baseURL: serverUrl, strategy: new SimpleAuthStrategy()});
const App = new Example(historyManager, requestManager);

window.addEventListener("load", () => ReactDOM.render(App.render(history), document.getElementById("root")));
