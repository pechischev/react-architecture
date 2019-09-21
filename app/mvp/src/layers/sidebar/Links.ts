import { IAppLink } from "../../interfaces";
import { EAppPaths } from "../../model";
import { SidebarIcons } from "./icons";

export const Links: IAppLink[] = [
    {
        path: EAppPaths.CONTENT,
        label: "Контент",
        icon: SidebarIcons.content
    },
    {
        path: EAppPaths.SITE,
        label: "Сайт",
        icon: SidebarIcons.site
    },
    {
        path: EAppPaths.SERVICES,
        label: "Службы",
        icon: SidebarIcons.services
    },
    {
        path: EAppPaths.SIGN_OUT,
        label: "Выход",
        icon: SidebarIcons.logout
    },
];
