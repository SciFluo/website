import path from 'path';
import webpack from 'webpack';
import WebpackBar from 'webpackbar';
import { VueLoaderPlugin } from 'vue-loader';
import TerserPlugin from 'terser-webpack-plugin';
import { minify as minifyXML } from 'minify-xml';
import CopyWebpackPlugin from 'copy-webpack-plugin';
import localPostcssOptions from './postcss.config.js';
import MiniCssExtractPlugin from 'mini-css-extract-plugin';
import CssMinimizerPlugin from 'css-minimizer-webpack-plugin';
import JsonMinimizerPlugin from 'json-minimizer-webpack-plugin';

class XmlMinimizerPlugin {
	apply(compiler) {
		compiler.hooks.compilation.tap('XmlMinimizerPlugin', compilation => {
			compilation.hooks.processAssets.tap(
				{
					name: 'XmlMinimizerPlugin',
					stage: webpack.Compilation.PROCESS_ASSETS_STAGE_OPTIMIZE,
				},
				assets => {
					for (const filename in assets) {
						if (filename.endsWith('.xml')) {
							let source = assets[filename].source();
							if (typeof source !== 'string') {
								source = source.toString();
							}
							const compressedXml = minifyXML(source);
							assets[filename] = {
								source: () => compressedXml,
								size: () => compressedXml.length,
							};
						}
					}
				},
			);
		});
	}
}

export default (env, argv) => {
	const isDevelopmentMode = argv.mode === 'development';

	/** @type {import('webpack').Configuration} */
	const config = {
		entry: {
			scifluo: path.resolve('./src/main.js'),
		},
		output: {
			path: path.resolve('source'),
			libraryTarget: 'umd2',
			filename: 'assets/js/[name].bundle.js',
		},
		/** @type {import('webpack-dev-server').Configuration} */
		devServer: {
			hot: true,
			port: Math.floor(Math.random() * 10001) + 10000,
			open: false,
			host: '127.0.0.1',
			static: [path.resolve('./public')],
			devMiddleware: {
				writeToDisk: true,
			},
		},
		cache: {
			type: 'filesystem',
		},
		module: {
			rules: [
				{
					test: /\.css$/,
					use: [
						MiniCssExtractPlugin.loader,
						'css-loader',
						{
							loader: 'postcss-loader',
							options: {
								postcssOptions: localPostcssOptions,
							},
						},
					],
				},
				{
					test: /\.less$/,
					use: [
						MiniCssExtractPlugin.loader,
						'css-loader',
						{
							loader: 'postcss-loader',
							options: {
								postcssOptions: localPostcssOptions,
							},
						},
						'less-loader',
					],
				},
				{
					test: /\.(woff|woff2)$/,
					type: 'asset/resource',
					generator: {
						filename: 'assets/fonts/[name][hash][ext]',
					},
				},
				{
					test: /\.svg$/,
					type: 'asset/source',
				},
				{
					test: /\.js$/,
					exclude: /node_modules/,
					use: {
						loader: 'babel-loader',
						options: {
							cacheDirectory: true,
						},
					},
				},
				{
					test: /\.vue$/,
					use: {
						loader: 'vue-loader',
					},
				},
			],
		},
		optimization: {
			minimize: isDevelopmentMode ? false : true,
			minimizer: [
				new TerserPlugin(),
				new CssMinimizerPlugin(),
				new JsonMinimizerPlugin(),
				new XmlMinimizerPlugin(),
			],
		},
		plugins: [
			new WebpackBar({
				color: '#87cefa',
			}),
			new webpack.DefinePlugin({
				__VUE_OPTIONS_API__: true,
				__VUE_PROD_DEVTOOLS__: isDevelopmentMode,
				__VUE_PROD_HYDRATION_MISMATCH_DETAILS__: false,
			}),
			new VueLoaderPlugin(),
			new MiniCssExtractPlugin({
				filename: 'assets/css/[name].css',
			}),
			new CopyWebpackPlugin({
				patterns: [
					{
						from: path.resolve('./public'),
						to: path.resolve('./source'),
					},
				],
			}),
		],
		devtool: 'source-map',
	};

	return config;
};
