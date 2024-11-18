const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
const CopyPlugin = require("copy-webpack-plugin");

module.exports = {
    mode: "development",
    entry: {
        editor: './src/editor/editor.js',
        action: './src/action/action.js'
    },
    output: {
        filename: '[name]/[name].js',
        path: path.resolve(__dirname, "build"),
    },
    target: "web",
    devServer: {
        port: "3000",
        static: ["./build"],
        open: true,
        hot: true,
        liveReload: true,
    },
    resolve: {
        extensions: [".js", ".jsx", ".json", ".ts"],
    },
    plugins: [
        new HtmlWebpackPlugin({
            template: "./src/action/action.html",
            filename: "action/action.html",
            chunks: ["action"],
        }),
        new HtmlWebpackPlugin({
            template: "./src/editor/editor.html",
            filename: "./editor/editor.html",
            chunks: ["editor"]
        }),
        new CopyPlugin({
            patterns: [{ from: "./src/static" }],
        }),
    ],
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                exclude: /node_modules/,
                use: "babel-loader",
            },
        ],
    },
};