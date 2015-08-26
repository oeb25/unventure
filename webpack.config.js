var webpack = require('webpack');
var path = require('path');

module.exports = {
	entry: './lib/main.js',

	output: {
		path: path.join(__dirname, 'build'),
		filename: 'bundle.js',
		publicPath: '/'
	},

	debug: true,

	watch: true,

	devtool: 'eval',

	module: {
		loaders: [
			{ test: /\.coffee$/, exclude: /node_modules/, loader: 'coffee-loader' },
			{ test: /\.js$/, exclude: /node_modules/, loader: 'babel?optional[]=runtime&stage=0' },
		],
	},
};
