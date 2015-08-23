module.exports = {
	entry: "./lib/main.js",

	output: {
		path: "./",
		filename: "bundle.js",
	},

	module: {
		loaders: [
			{ test: /\.coffee$/, loader: "coffee-loader" },
			{ test: /\.js$/,    loader: "babel-loader" },
		],
	},
};
