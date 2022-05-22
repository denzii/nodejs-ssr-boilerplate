const path = require("path");
const nodeExternals = require('webpack-node-externals');

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
                    }
                ]
            },
		]
    },
	experiments: {
		topLevelAwait: true,
	},
    resolve: {
		fallback: {
            "fs": false
        },
        extensions: ['.tsx', '.ts'],
    }
};

module.exports = config;