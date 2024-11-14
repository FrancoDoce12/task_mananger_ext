const path = require("path");


module.exports = {
    mode: "development",
    entry: {
        editor: './src/editor/editor.js',
        action: './src/action/action.js'
    }, // if we make this object just the first string "./src/editor/editor.js" the command npm build works
    output: {
        filename: '[name]/[name].js', // Simple output file for testing
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