const path = require("path");
const { merge } = require("webpack-merge");
const common = require("./common.config");

const dev = {
	mode:"development",
	devtool: "eval-cheap-source-map",
	plugins : [],
    devServer: {
        contentBase: path.join(__dirname, 'dist'),
        compress: true,
        port: 9000,
      },
}

module.exports = merge(common, dev);