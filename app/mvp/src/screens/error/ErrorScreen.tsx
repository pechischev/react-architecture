import { FC } from "react";
import * as React from "react";
import "./ErrorScreen.scss";

export const ErrorScreen: FC = () => (
    <div className="error">
        <div className="error-message">
            <div className="error-message__code">Ошибка 404</div>
            <div className="error-message__message">Страница не найдена</div>
            <div className="error-message__note">
                Если вы считаете, что страницы нет по нашей вине, <a href="#">напишите нам</a>.
            </div>
        </div>
    </div>
);
