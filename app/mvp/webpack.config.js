const path = require("path");
const PeerDepsExternalsPlugin = require("peer-deps-externals-webpack-plugin");
const common = require("../../config/webpack.config");

module.exports = (params, argv) => {
    return {
        entry: {
            index: "./src/index.tsx",
        },
        output: {
            path: path.resolve(__dirname, "build"),
            filename: "[name].js",
        },
        ...common({
            sourceModule: "./src",
            sourcePath: path.resolve(__dirname, "./src"),
            htmlPath: path.resolve(__dirname, "public/index.html"),
            plugins: [new PeerDepsExternalsPlugin()]
        }, argv),
    };
};
