const path = require("path");
const common = require("../../config/webpack.config");
const ports = require("../../config/ports");
const PeerDepsExternalsPlugin = require("peer-deps-externals-webpack-plugin");

module.exports = (params, argv) => {
    return {
        entry: {
            index: "./src/index.ts",
        },
        output: {
            path: path.resolve(__dirname, "build"),
            filename: "index.js",
            library: "Core",
            libraryTarget: "umd",
        },
        ...common({
            sourceModule: "./src",
            sourcePath: path.resolve(__dirname, "./src"),
            port: ports.app,
            plugins: [new PeerDepsExternalsPlugin()]
        }, argv),
    };
};
