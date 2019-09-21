function getIcons(name: string): {active: string, inactive: string} {
    return {
        active: require(`./${name}-icon-active.svg`),
        inactive: require(`./${name}-icon-inactive.svg`),
    };
}

export const SidebarIcons = {
    content: getIcons("content"),
    logout: getIcons("logout"),
    services: getIcons("services"),
    site: getIcons("site"),
};
