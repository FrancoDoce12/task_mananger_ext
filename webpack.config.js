const path = require("path");


module.exports = {
    mode: "development",
    entry: {main_editor: './src/main_editor/main_editor.js'}, // Single entry point to isolate the issue
    output: {
        path: path.resolve(__dirname, "build"),
        filename: "bundle.js", // Simple output file for testing
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