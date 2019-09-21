import { ValidationErrors } from "final-form";
import { ObservableStream } from "../../model";
import { AxiosPromise } from "axios";

export interface ISurveyPresenter {
    fetchSurveyById(id: number): AxiosPromise<object>;
    clearSurvey(): void;
    setSurvey(value: object): void;
    getSurvey(): object;
    getChangedSurveyStream(): ObservableStream<object>;

    validate(data: object): ValidationErrors;
    sendData(data: object): void;

    loadReceipts(values: object): void;
    getLoadedReceiptsStream(): ObservableStream<object[]>;

    getCountries(): object[];
    getSellers(): object[];
    getReceipts(): object[];
}
