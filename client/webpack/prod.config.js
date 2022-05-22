const { merge } = require("webpack-merge");
const common = require("./common.config");


const prod = {
	mode:"development",
	devtool: "source-map",
	plugins : []
}

module.exports = merge(common, prod);