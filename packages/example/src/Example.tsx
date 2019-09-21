import * as React from "react";
import {  ReactElement } from "react";
import { Route, Router, Switch } from "react-router-dom";
import { Links, Submenu } from "./layer";
import { EPaths } from "./model";
import { ItemsList } from "./pages";
import { ExampleController } from "./controller";
import { IHistoryManager, IRequestManager } from "@mvp/core";
import { History } from "history";
import { ExampleProvider } from "./ExampleContext";

export class Example {
    private readonly controller: ExampleController;

    constructor(history: IHistoryManager, request: IRequestManager) {
        this.controller = new ExampleController(history, request);
    }

    render(history: History): ReactElement {
        return (
            <Router history={history}>
                <div className="section">
                    <div className="section-menu">
                        <Submenu title={"Пример"} paths={Links}/>
                    </div>
                    <ExampleProvider value={this.controller}>
                        <div className="section-content">
                            <Switch>
                                <Route
                                    path={`/${EPaths.ITEMS}`}
                                    render={ItemsList}
                                />
                            </Switch>
                        </div>
                    </ExampleProvider>
                </div>
            </Router>
        );
    }
}
