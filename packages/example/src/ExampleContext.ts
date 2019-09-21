import * as React from "react";
import { IExampleController } from "./controller";

export const ExampleContext = React.createContext<IExampleController>(new class {} as IExampleController);
export const ExampleProvider = ExampleContext.Provider;
export const ExampleConsumer = ExampleContext.Consumer;
