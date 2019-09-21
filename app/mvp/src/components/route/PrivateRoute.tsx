import * as React from "react";
import { Redirect, Route, RouteComponentProps, RouteProps } from "react-router";
import { EAppPaths } from "../../model";
import { AuthController } from "../../controller";

interface IPrivateRouteProps extends RouteProps {
    auth: AuthController;
    render: ((props: RouteComponentProps) => React.ReactNode);
}

export const PrivateRoute = (props: IPrivateRouteProps) => {
    const {render, auth, ...rest } = props;
    return (
        <Route
            {...rest}
            render={(routeProps: RouteComponentProps) => (
                auth.authenticated() ? (
                    render(routeProps)
                ) : (
                    <Redirect to={`/${EAppPaths.SIGN_IN}`}/>
                )
            )}
        />
    );
};
