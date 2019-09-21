import { ILink } from "@mvp/core";

export interface IAppLink extends ILink {
    icon: {
        active: string;
        inactive: string;
    };
}
