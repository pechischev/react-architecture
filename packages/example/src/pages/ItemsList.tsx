import * as React from "react";
import { Table } from "../view/table";
import { ExampleConsumer } from "../ExampleContext";

export const ItemsList = () => {
    return (
        <ExampleConsumer>
            {(controller) => (
                <div>
                    <Table
                        presenter={controller.getTablePresenter()}
                        onClickRow={controller.showItem}
                    />
                </div>
            )}
        </ExampleConsumer>
    );
};
