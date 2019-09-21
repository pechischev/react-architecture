import * as React from "react";
import "./SignIn.scss";
import { EAuthField } from "../../model/auth";
import { AuthController } from "../../controller";
import { Field, Form, FormRenderProps } from "react-final-form";

const signInForm = (api: FormRenderProps) => (
    <div className="auth__container login">
        <div className="login__title">Авторизация</div>
        <div className="login__fields">
            <Field name={EAuthField.LOGIN} placeholder={"Логин"} component={"input"} type={"text"}/>
            <Field name={EAuthField.PASSWORD} type={"password"} placeholder={"Пароль"} component={"input"}/>
        </div>
        <div className="login__action">
            <button
                onClick={() => api.handleSubmit()}
            >
                Войти
            </button>
        </div>
    </div>
);

interface ISignInProps {
    controller: AuthController;
}

export const SignIn = (props: ISignInProps) => {
    const { controller } = props;
    return (
        <div className="auth">
            <Form
                onSubmit={controller.signIn.bind(controller)}
                validate={controller.validate.bind(controller)}
                render={signInForm}
            />
        </div>
    );
};
