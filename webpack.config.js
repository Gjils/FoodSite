"use strict";

let path = require("path");

module.exports = {
	mode: "production",
	entry: "./js/script.js",
	output: {
		filename: "js/bundle.js",
		path: __dirname,
	},
	watch: true,

	devtool: "source-map",

	module: {},
	plugins: [],
};
