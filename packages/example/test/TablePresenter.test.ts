import { ITablePresenter, TablePresenter } from "../src/presenters/table";

describe("TablePresenter", () => {

    let table: ITablePresenter<object>;

    const mockData = [
        { fieldOne: "a", fieldTwo: "b", fieldThree: 1, fieldFour: 1 },
        { fieldOne: "c", fieldTwo: "d", fieldThree: 2, fieldFour: 0.5 },
    ];

    function createTable(): ITablePresenter<object> {
        return TablePresenter.build();
    }

    describe("initialize", () => {
        test("should be empty after build", () => {
            table = createTable();
            expect(table.getData()).toStrictEqual([]);
            expect(table.getColumns()).toStrictEqual([]);
            expect(table.getCount()).toStrictEqual(0);
        });

        test("should return correct data after set data", () => {
            table = createTable();
            table.setData(mockData);
            const expected = mockData.slice();
            expect(table.getData()).toEqual(expected);
        });
    });

    beforeEach(() => {
        table = createTable();
        table.setData(mockData.slice());
    });

    describe("getRowById", () => {
        test("should get row by index", () => {
            const expected = { fieldOne: "a", fieldTwo: "b", fieldThree: 1, fieldFour: 1 };
            expect(table.getRowByIndex(0)).toEqual(expected);
        });

        test("not should get nonexistent row by index", () => {
            expect(table.getRowByIndex(7)).toEqual(undefined);
        });

        test("should throw error on invalid id", () => {
            expect(table.getRowByIndex.bind(table, -1)).toThrow(Error);
        });
    });

    describe("appendRow", () => {
        test("should add row to end", () => {
            expect(table.getData().length).toEqual(2);
            table.appendRow({ fieldOne: "q", fieldTwo: "z" });
            expect(table.getData().length).toEqual(3);
            expect(table.getRowByIndex(2)).toEqual({ fieldOne: "q", fieldTwo: "z" });
        });

        test("not should add row again", () => {
            expect(table.getData().length).toEqual(2);
            const newRow = { fieldOne: "q", fieldTwo: "z" };
            table.appendRow(newRow);
            table.appendRow(newRow);
            expect(table.getData().length).toEqual(3);
        });
    });

    describe("removeRow", () => {
        test("should remove row", () => {
            expect(table.getData().length).toEqual(2);
            table.removeRow(1);
            expect(table.getData().length).toEqual(1);
        });

        test("not should remove nonexistent row", () => {
            expect(table.getData().length).toEqual(2);
            table.removeRow(3);
            expect(table.getData().length).toEqual(2);
        });
    });

    describe("columns", () => {
        test("should receive data on selected columns", () => {
            table.setColumns([{ field: "fieldOne" }, { field: "fieldThree" }]);
            const expected = mockData.map(({ fieldOne, fieldThree }) => ([ {value: fieldOne}, {value: fieldThree}]));
            expect(table.getTableData()).toEqual(expected);
            expect(table.getData()).toEqual(mockData);
        });

        test("should receive data in the given order", () => {
            table.setColumns([{ field: "fieldThree" }, { field: "fieldOne" }]);
            const expected = mockData.map(({ fieldOne, fieldThree }) => ([ {value: fieldThree}, {value: fieldOne}]));
            expect(table.getTableData()).toEqual(expected);
            expect(table.getData()).toEqual(mockData);
        });

        test("should receive default data on nonexistent columns", () => {
            table.setColumns([{ field: "a" }, { field: "b" }]);
            expect(table.getTableData()).toEqual([
                [{value: void 0}, {value: void 0}],
                [{value: void 0}, {value: void 0}]
            ]);
            expect(table.getData()).toEqual(mockData);
        });
    });
});
