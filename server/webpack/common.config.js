const path = require("path");
const nodeExternals = require('webpack-node-externals');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const config = {
    entry: "./src/index.ts",
    output: {
        path: path.resolve(__dirname, '../dist'),
        filename: "main.js",
		clean: true,
    },
	target: "node",
	externals: [nodeExternals({})],
    externalsPresets: { node: true }, // in order to ignore built-in modules like path, fs, etc.
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
                    },
                ]
            },
            {
                test: /\.(c|sc)ss$/,
                use: ["ignore-loader"]
            },
            {
                test: /\.(woff|woff2|eot|ttf|svg|jpg|png|jpeg|webp)$/,
                use: {
                  loader: 'url-loader',
                },
            },
		]
    },
	experiments: {
		topLevelAwait: true,
	},
    plugins: [new MiniCssExtractPlugin()],
    resolve: {
		fallback: {
            "fs": false
        },
        extensions: ['.tsx', '.ts'],
    }
};

module.exports = config;