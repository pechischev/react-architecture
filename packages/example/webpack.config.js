const path = require("path");
const common = require("../../config/webpack.config");
const ports = require("../../config/ports");

module.exports = (params, argv) => {
    return {
        entry: {
            index: "./src/index.tsx"
        },
        output: {
            path: path.resolve(__dirname, "build"),
            filename: "index.js",
        },
        ...common({
            sourceModule: "./src",
            sourcePath: path.resolve(__dirname, "./src"),
            htmlPath: path.resolve(__dirname, "public/index.html"),
            port: ports.example
        }, argv),
    };
};
