import { ISurveyPresenter } from "../../presenters/survey";
import * as React from "react";
import { useEffect, useState } from "react";
import { Form } from "react-final-form";

interface ISurveyProps {
    presenter: ISurveyPresenter;
}

export const Survey = (props: ISurveyProps) => {
    const { presenter } = props;
    const [data, changeData] = useState(presenter.getSurvey);

    useEffect(() => {
        const subscriber = presenter.getChangedSurveyStream().subscribe(changeData);
        return () => subscriber.unsubscribe();
    }, []);

    return (
        <div>
            <Form
                onSubmit={presenter.sendData}
                validate={presenter.validate}
                initialValues={data}
                render={() => <div/>}
            />
        </div>
    );
};
