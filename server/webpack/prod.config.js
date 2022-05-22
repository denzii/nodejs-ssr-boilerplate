const { merge } = require("webpack-merge");
const common = require("./common.config");
const Dotenv = require("dotenv-webpack");

const dev = {
	mode:"production",
	devtool: "source-map",
	plugins : [
		new Dotenv({
			path: './env/production.env', // load this now instead of the ones in '.env'
			safe: true, // load '.env.example' to verify the '.env' variables are all set. Can also be a string to a different file.
			allowEmptyValues: true, // allow empty variables (e.g. `FOO=`) (treat it as empty string, rather than missing)
			systemvars: true, // load all the predefined 'process.env' variables which will trump anything local per dotenv specs.
			silent: true, // hide any errors
			defaults: false // load '.env.defaults' as the default values if empty.
		  })
	]
}

module.exports = merge(common, dev);