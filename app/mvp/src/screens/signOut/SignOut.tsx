import * as React from "react";
import { useEffect } from "react";
import { AuthController } from "../../controller";

interface ISignOutProps {
    controller: AuthController;
}

export const SignOut = (props: ISignOutProps) => {
    const { controller } = props;
    useEffect(() => {
        controller.logout();
    }, []);
    return (
        <div/>
    );
};
