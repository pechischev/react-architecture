import { IConfig } from "./IConfig";

const { SERVER_URL = ""} = process.env;
export const Config: IConfig = {
    serverUrl: SERVER_URL
};
