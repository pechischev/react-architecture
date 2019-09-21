import * as React from "react";
import { Redirect, Route, Router, Switch } from "react-router-dom";
import "./App.scss";
import { Links, Sidebar, Content } from "./layers";
import { EAppPaths } from "./model";
import { PrivateRoute } from "./components";
import { SignOut, SignIn, ErrorScreen } from "./screens";
import { createBrowserHistory, History } from "history";
import { AuthController } from "./controller";
import {
    AxiosRequestManager,
    Config,
    SimpleAuthStrategy,
    JWTAuthStrategy,
    HistoryManager,
    TokenLocalStorageManager,
    IHistoryManager,
    IRequestManager,
    ITokenManager,
} from "@mvp/core";
import { ReactElement } from "react";
import { Example } from "@mvp/example";

const { serverUrl } = Config;

export class App {
    private readonly history: History;
    private readonly tokenManager: ITokenManager;
    private readonly historyManager: IHistoryManager;
    private readonly requestManager: IRequestManager;
    private readonly auth: AuthController;
    private readonly example: Example;

    constructor() {
        this.history = createBrowserHistory();
        this.tokenManager = new TokenLocalStorageManager();
        this.historyManager = new HistoryManager(this.history);
        this.requestManager = AxiosRequestManager.create({
            baseURL: serverUrl,
            strategy: new SimpleAuthStrategy(),
        });
        this.auth = new AuthController(this.tokenManager, this.historyManager, this.requestManager);
        this.example = new Example(this.historyManager, this.requestManager);
    }

    initialize(): void {
        const isAuthenticated = this.auth.authenticated();
        if (isAuthenticated) {
            this.requestManager.setStrategy(new JWTAuthStrategy(this.tokenManager.getToken()!));
        }
    }

    render(): ReactElement {
        return (
            <Router history={this.history}>
                <Switch>
                    <Route
                        exact={true}
                        path={`/${EAppPaths.SIGN_IN}`}
                        component={() => <SignIn controller={this.auth}/>}
                    />
                    <Route
                        exact={true}
                        path={`/${EAppPaths.SIGN_OUT}`}
                        component={() => <SignOut controller={this.auth}/>}
                    />
                    <Route path={"/"}>
                        <div className="app">
                            <Sidebar links={Links}/>
                            <Content>
                                <Switch>
                                    <Route path={`/${EAppPaths.ERROR}`} component={ErrorScreen}/>
                                    <PrivateRoute
                                        auth={this.auth}
                                        path={`/${EAppPaths.CONTENT}`}
                                        render={this.example.render.bind(this.example,
                                            createBrowserHistory({ basename: `${EAppPaths.CONTENT}` })
                                        )}
                                    />
                                    <Route component={() => <Redirect to={`/${EAppPaths.ERROR}`}/>}/>
                                </Switch>
                            </Content>
                        </div>
                    </Route>
                </Switch>
            </Router>
        );
    }
}
