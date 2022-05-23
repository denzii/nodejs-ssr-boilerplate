const path = require("path");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");

const config = {
    plugins: [new MiniCssExtractPlugin({ filename: "[name].css" })],
    entry: {
        app: "./src/index.tsx",
        main: "./src/style/index.scss"
    },
    output: {
        path: path.resolve(__dirname, '../../server/www'),
        // filename: "[name].js",
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
            {
                test: /\.(c|sc)ss$/,
                use: [MiniCssExtractPlugin.loader, 'css-loader', "sass-loader"],
            },
		]
    },
	  experiments: {
		  topLevelAwait: true,
	  },
    resolve: {
        extensions: ['.js', '.tsx', '.ts'],
        
    },
};

module.exports = config;