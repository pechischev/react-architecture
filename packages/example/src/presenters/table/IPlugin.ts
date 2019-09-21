import { Component } from "react";

export interface IPlugin {
    setSettings(settings: object): void;
    getSettings(): object;
    getComponent(): Component | Element;
}
