const os = require("os");
const fs = require("fs");
const dotenv = require("dotenv");
const path = require("path");
const webpack = require("webpack");
const HardSourceWebpackPlugin = require("hard-source-webpack-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const ForkTsCheckerWebpackPlugin = require("fork-ts-checker-webpack-plugin");
const CircularDependencyPlugin = require("circular-dependency-plugin");

const devServerSettings = require("./webpack/devServerSettings");
const styleSettings = require("./webpack/styleSettings");

module.exports = (params, argv) => {
    const mode = argv.mode || "development";
    const isProduction = mode !== "development";
    const config = dotenv.parse(fs.readFileSync(path.resolve(__dirname, "../.env")));

    const env = {
        raw: {
            NODE_ENV: process.env.NODE_ENV || "development",
            ...config
        },
        get stringified() {
            return {
                "process.env": Object.keys(this.raw).reduce((env, key) => {
                    env[key] = JSON.stringify(this.raw[key]);
                    return env;
                }, {}),
            };
        },
    };

    const {sourcePath, htmlPath, sourceModule, port, plugins = []} = params;
    return {
        ...(isProduction ? {} : { devtool: "eval-sourcemap" }),
        optimization: {
            minimize: isProduction,
            removeAvailableModules: isProduction,
            removeEmptyChunks: isProduction,
            splitChunks: isProduction && {},
        },
        resolve: {
            extensions: [".ts", ".tsx", ".js", ".jsx"],
            modules: ["node_modules", "src"],
            alias: {
                "styles": path.resolve(__dirname, "../styles"),
            },
        },
        module: {
            rules: [
                {
                    test: /\.ts(x?)$/,
                    include: sourcePath,
                    exclude: /node_modules/,
                    use: [
                        {
                            loader: "thread-loader",
                            options: {
                                workers: os.cpus().length - 1,
                                poolTime: Infinity,
                            },
                        },
                        {
                            loader: "babel-loader",
                            options: {
                                presets: [
                                    "@babel/preset-env"
                                ],
                                plugins: ["@babel/plugin-proposal-object-rest-spread", "react-loadable/babel"]
                            }
                        },
                        {
                            loader: "ts-loader",
                            options: {
                                transpileOnly: true,
                                happyPackMode: true,
                                experimentalWatchApi: true,
                            },
                        },
                    ],
                },
                {
                    test: /\.(gif|png|jpe?g|svg)$/i,
                    use: [
                        {
                            loader: "file-loader",
                            options: {
                                outputPath: "assets/images"
                            }
                        },
                        {
                            loader: "image-webpack-loader",
                            options: {
                                bypassOnDebug: true,
                            }
                        },
                    ]
                },
                styleSettings(),
                {
                    test: /\.(woff|woff2|eot|ttf|otf)$/,
                    loader: "file-loader",
                    options: {
                        outputPath: "assets/fonts"
                    }
                }
            ],
        },
        performance: {
            hints: false,
        },
        plugins: [
            new HardSourceWebpackPlugin(),
            new webpack.DefinePlugin(env.stringified),
            new webpack.HotModuleReplacementPlugin(),
            ...plugins,
            new CircularDependencyPlugin({
                exclude: /node_modules/
            }),
            !!htmlPath && new HtmlWebpackPlugin({
                inject: true,
                template: htmlPath
            }),
            new ForkTsCheckerWebpackPlugin({
                watch: sourceModule,
                checkSyntacticErrors: true,
            }),
        ].filter(Boolean),
        node: {
            dgram: "empty",
            fs: "empty",
            net: "empty",
            tls: "empty",
            child_process: "empty",
        },
        devServer: devServerSettings({contentBase: sourceModule, port})
    };
};
