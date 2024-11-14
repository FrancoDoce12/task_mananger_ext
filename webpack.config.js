const path = require("path");


module.exports = {
    mode: "development",
    entry: './src/editor/editor.js', // Single entry point to isolate the issue
    output: {
        filename: 'editor/editor.js', // Simple output file for testing
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