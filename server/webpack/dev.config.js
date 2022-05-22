const { merge } = require("webpack-merge");
const common = require("./common.config");
const Dotenv = require("dotenv-webpack");
const NodemonPlugin = require('nodemon-webpack-plugin');

const dev = {
	mode:"development",
	devtool: "eval-cheap-source-map",
	plugins : [
		new NodemonPlugin({
			script: "./dist/main.js",
			watch: ["./dist/"],
			ignore: [".git", "node_modules/", "public/", "coverage/"],
			delay: "2500",
			verbose: true,
			signal: "SIGINT",
			restartable: "rs",
			execMap: {
				"ts": "node -r ts-node/register"
			}
		}),
		new Dotenv({
			path: './env/development.env', // load this now instead of the ones in '.env'
			safe: true, // load '.env.example' to verify the '.env' variables are all set. Can also be a string to a different file.
			allowEmptyValues: true, // allow empty variables (e.g. `FOO=`) (treat it as empty string, rather than missing)
			systemvars: true, // load all the predefined 'process.env' variables which will trump anything local per dotenv specs.
			silent: true, // hide any errors
			defaults: false // load '.env.defaults' as the default values if empty.
		  })
	]
}

module.exports = merge(common, dev);