const path = require("path");
const webpack = require("webpack");
const HtmlWebpackPlugin = require("html-webpack-plugin");

const config = {
    entry: "./src/index.ts",
    output: {
        path: path.resolve(__dirname, '../dist'),
        filename: "main.js",
		clean: true,
    },
    module: {
        rules: [
            {
                test: /\.(t|j)sx?$/,
                exclude: [
                    /node_modules/,
                ],
                use: [
                    {
                        loader: "babel-loader"
                    }
                ]
            },
		]
    },
	  experiments: {
		  topLevelAwait: true,
	  },
    resolve: {
        extensions: ['.js', '.tsx', '.ts'],
        
    },
    plugins: [new HtmlWebpackPlugin({"title": "Deniz Arca", "template":"./src/index.html"})],
};

module.exports = config;