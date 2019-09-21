import { SurveyService } from "../../services";
import { Presenter } from "@mvp/core";
import { AxiosPromise } from "axios";
import { ISurveyPresenter } from "./ISurveyPresenter";
import { isEqual, stubObject } from "lodash";
import { ObservableStream } from "../../model";
import { Subject } from "rxjs";
import { ValidationErrors } from "final-form";

export class SurveyPresenter extends Presenter implements ISurveyPresenter {
    private readonly changedSurvey$ = new Subject<object>();
    private readonly loadedReceipts$ = new Subject<object[]>();
    private readonly service = new SurveyService(this.requestManager);
    private survey?: object;

    fetchSurveyById(id: number): AxiosPromise<object> {
        return this.service.getById(id);
    }

    clearSurvey(): void {
        this.setSurveyImpl(undefined);
    }

    setSurvey(value?: object): void {
        this.setSurveyImpl(value);
    }

    getSurvey(): object {
        return this.survey || stubObject();
    }

    getChangedSurveyStream(): ObservableStream<object> {
        return this.changedSurvey$;
    }

    sendData(data: object): void {
    }

    loadReceipts(values: object): void {
        this.service.loadReceipts(values);
    }

    getLoadedReceiptsStream(): ObservableStream<object[]> {
        return this.loadedReceipts$;
    }

    getCountries(): object[] {
        return [];
    }

    getSellers(): object[] {
        return [];
    }

    getReceipts(): object[] {
        return [];
    }

    validate(data: object): ValidationErrors {
        return this.service.validate(data);
    }

    private setSurveyImpl(survey?: object) {
        if (isEqual(survey, this.survey)) {
            return;
        }
        this.survey = survey;
        this.triggerChangeSurvey();
    }

    private triggerChangeSurvey(): void {
        this.changedSurvey$.next(this.getSurvey());
    }
}
