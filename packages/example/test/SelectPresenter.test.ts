import { ISelectPresenter, SelectPresenter } from "../src/presenters/selector";
import { ESelectionMode } from "../src/presenters/selector";

describe("SelectPresenter", () => {
    let selector: ISelectPresenter<object>;

    const mockData = [
        { a: 1, b: 1 },
        { a: 2, b: 3 },
        { a: 1, b: 4 },
        { a: 2, b: 4 },
        { a: 3, b: 5 },
    ];

    function createSelector(): ISelectPresenter<object> {
        selector = new SelectPresenter<object>();
        (selector as SelectPresenter<object>).setItems(mockData);
        return selector;
    }

    function getExpectedValueByRange(range: number[]) {
        return mockData.filter((value, index) => range.includes(index));
    }

    beforeEach(() => {
        selector = createSelector();
    });

    describe("initialize", () => {
        test("should be empty", () => {
            expect(selector.getSelection()).toEqual([]);
            expect(selector.getSelectedIndexes()).toEqual([]);
        });
    });

    describe("select", () => {
        test("should select several items", () => {
            selector.select([1, 2, 3]);
            const expected = [1, 2, 3];
            expect(selector.getSelectedIndexes()).toEqual(expected);
            expect(selector.getSelection()).toEqual(getExpectedValueByRange(expected));
        });

        test("not should select nonexistent item", () => {
            expect(selector.select.bind(selector, [1, 8])).toThrow(Error);
            expect(selector.getSelection()).toEqual(getExpectedValueByRange([]));
            expect(selector.getSelectedIndexes()).toEqual([]);
        });

        test("not should select item with negative index", () => {
            expect(selector.select.bind(selector, [-1])).toThrow(Error);
            expect(selector.getSelection()).toEqual(getExpectedValueByRange([]));
            expect(selector.getSelectedIndexes()).toEqual([]);
        });

        test("should replace selection", () => {
            selector.select([1, 2]);
            selector.select([3, 4]);
            const expected = [3, 4];
            expect(selector.getSelection()).toEqual(getExpectedValueByRange(expected));
            expect(selector.getSelectedIndexes()).toEqual(expected);
        });

        test("should append selection by multiple select mode", () => {
            expect(selector.getSelection()).toEqual([]);
            selector.select([1, 2], ESelectionMode.MULTIPLE);
            selector.select([3, 4], ESelectionMode.MULTIPLE);
            const expected = [1, 2, 3, 4];
            expect(selector.getSelection()).toEqual(getExpectedValueByRange(expected));
            expect(selector.getSelectedIndexes()).toEqual(expected);
        });

        test("should remove items selection by multiple select if they are selected again", () => {
            expect(selector.getSelection()).toEqual([]);
            selector.select([1, 2, 3, 4], ESelectionMode.MULTIPLE);
            selector.select([1, 2, 3], ESelectionMode.MULTIPLE);
            const expected = [4];
            expect(selector.getSelection()).toEqual(getExpectedValueByRange(expected));
            expect(selector.getSelectedIndexes()).toEqual(expected);
        });

        test("should reset selection if reselect with no items", () => {
            selector.select([1, 2]);
            selector.select([]);
            expect(selector.getSelection()).toEqual([]);
            expect(selector.getSelectedIndexes()).toEqual([]);
        });

        test("should send event with selected indexes", () => {
            const spyCallback = jest.fn();
            selector.getSelectionChangeStream().subscribe(spyCallback);
            selector.select([0, 2, 3]);
            expect(spyCallback.mock.calls.length).toBe(1);
            expect(spyCallback.mock.calls[0][0]).toEqual([0, 2, 3]);
        });
    });

    describe("deselect", () => {
        test("should remove selection from selected items", () => {
            selector.select([1, 2, 3]);
            expect(selector.getSelection()).toEqual(getExpectedValueByRange([1, 2, 3]));
            selector.unselect([1, 2]);
            const expected = [3];
            expect(selector.getSelection()).toEqual(getExpectedValueByRange(expected));
            expect(selector.getSelectedIndexes()).toEqual(expected);
        });

        test("not should remove selection from unselected items", () => {
            selector.select([1, 2]);
            expect(selector.getSelection()).toEqual(getExpectedValueByRange([1, 2]));
            selector.unselect([6]);
            const expected = [1, 2];
            expect(selector.getSelection()).toEqual(getExpectedValueByRange(expected));
            expect(selector.getSelectedIndexes()).toEqual(expected);
        });
    });

    describe("selectAll", () => {
        test("should select all items", () => {
            selector.selectAll();
            const expected = [0, 1, 2, 3, 4];
            expect(selector.getSelection()).toEqual(getExpectedValueByRange(expected));
            expect(selector.getSelectedIndexes()).toEqual(expected);
        });
    });

    describe("deselectAll", () => {
        test("should unselect all items", () => {
            selector.selectAll();
            selector.unselectAll();
            expect(selector.getSelectedIndexes()).toEqual([]);
        });
    });
});
