const path = require("path");
const PeerDepsExternalsPlugin = require("peer-deps-externals-webpack-plugin");
const common = require("../../config/webpack.config");

module.exports = (params, argv) => {
    return {
        entry: {
            module: "./src/module.ts",
        },
        output: {
            path: path.resolve(__dirname, "build"),
            filename: "module.js",
            library: "Example",
            libraryTarget: "umd",
        },
        ...common({
            sourceModule: "./src",
            sourcePath: path.resolve(__dirname, "./src"),
            plugins: [new PeerDepsExternalsPlugin()]
        }, argv),
    };
};
