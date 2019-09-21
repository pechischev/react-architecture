import { ITablePresenter, TablePresenter, ISurveyPresenter, SurveyPresenter } from "../presenters";
import { IHistoryManager, IRequestManager } from "@mvp/core";
import { ExampleService } from "../services";
import { IExampleController } from "./IExampleController";
import { EAlignType } from "../model";

export class ExampleController implements IExampleController {
    private readonly service: ExampleService;
    private readonly tablePresenter: ITablePresenter<object>;
    private surveyPresenter: ISurveyPresenter;

    constructor(history: IHistoryManager, request: IRequestManager) {
        this.tablePresenter = TablePresenter.build();
        this.tablePresenter.setColumns([
            { field: "a", label: "a" },
            { field: "b", label: "b" },
            { field: "c", label: "c", options: { align: EAlignType.RIGHT } },
        ]);
        this.tablePresenter.setData([
            { a: 123, b: "qweqweqwe", c: 123123 },
            { a: 123, b: "qweqweqwe", c: 123123 },
            { a: 123, b: "qweqweqwe", c: 123123 },
            { a: 123, b: "qweqweqwe", c: 123123 },
            { a: 123, b: "qweqweqwe", c: 123123 },
        ]);
        this.surveyPresenter = new SurveyPresenter(history, request);
        this.service = new ExampleService(request);
    }

    fetchItems(): void {
        this.service.getItems()
            .then((response) => this.tablePresenter.setData(response.data))
            .catch((error) => console.error(error));
    }

    createItem(): void {
        // TODO: should call method of Model
        this.surveyPresenter.clearSurvey();
    }

    showItem(index: number): void {
        const data = this.tablePresenter.getRowByIndex(index);
        if (!data) {
            return;
        }
        const { id } = data as { id: number };
        this.surveyPresenter.fetchSurveyById(id)
            .then((response) => this.surveyPresenter.setSurvey(response.data))
            .catch((error) => console.error(error));
    }

    getTablePresenter(): ITablePresenter<object> {
        return this.tablePresenter;
    }
}
