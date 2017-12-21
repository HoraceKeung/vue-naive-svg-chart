const webpack = require('webpack')
const merge = require('webpack-merge')
const path = require('path')

var config = {
	output: {
		path: path.resolve(__dirname + '/dist/'),
	},
	module: {
		loaders: [
			{
				test: /\.js$/,
				loader: 'babel',
				include: __dirname,
				exclude: /node_modules/
			},
			{
				test: /\.vue$/,
				loader: 'vue'
			},
			{
				test: /\.css$/,
				loader: 'style!less!css'
			}
		]
	},
	externals: {
		lodash: {
			commonjs: 'lodash',
			amd: 'lodash',
			root: '_'
		}
	},
	plugins: [
		new webpack.optimize.UglifyJsPlugin( {
			minimize : true,
			sourceMap : false,
			mangle: true,
			compress: {
				warnings: false
			}
		} )
	]
}

module.exports = [
	merge(config, {
		entry: path.resolve(__dirname + '/src/plugin.js'),
		output: {
			filename: 'vue-naive-svg-chart.min.js',
			libraryTarget: 'window',
			library: 'VueNaiveSvgChart',
		}
	}),
	merge(config, {
		entry: path.resolve(__dirname + '/src/Chart.vue'),
		output: {
			filename: 'vue-naive-svg-chart.js',
			libraryTarget: 'umd',
			library: 'vue-naive-svg-chart',
			umdNamedDefine: true
		}
	})
]
