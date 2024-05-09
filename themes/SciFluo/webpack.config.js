import path from "path";
import webpack from "webpack";
import { VueLoaderPlugin } from "vue-loader";
import TerserPlugin from "terser-webpack-plugin";
import CopyWebpackPlugin from "copy-webpack-plugin";
import localPostcssOptions from "./postcss.config.js";
import MiniCssExtractPlugin from "mini-css-extract-plugin";
import CssMinimizerPlugin from "css-minimizer-webpack-plugin";
import JsonMinimizerPlugin from "json-minimizer-webpack-plugin";

export default (env, argv) => {
	const isDevelopmentMode = argv.mode === "development";
	return {
		entry: "./src/main.js",
		output: {
			path: path.resolve("source"),
			libraryTarget: "umd",
			filename: "main.js",
		},
		module: {
			rules: [
				{
					test: /\.(css|less)$/,
					use: [
						MiniCssExtractPlugin.loader,
						"css-loader",
						{
							loader: "postcss-loader",
							options: {
								postcssOptions: localPostcssOptions,
							},
						},
						"less-loader",
					],
				},
				{
					test: /\.scss$/,
					use: [
						MiniCssExtractPlugin.loader,
						"css-loader",
						"sass-loader",
					],
				},
				{
					test: /\.(woff|woff2|eot|ttf|otf)$/,
					type: "asset/resource",
					generator: {
						filename: "assets/fonts/[name][hash][ext]",
					},
				},
				{
					test: /\.svg$/,
					type: "asset/source",
				},
				{
					test: /\.js$/,
					exclude: /node_modules/,
					use: {
						loader: "babel-loader",
					},
				},
				{
					test: /\.vue$/,
					use: {
						loader: "vue-loader",
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
			],
		},
		plugins: [
			new VueLoaderPlugin(),
			new MiniCssExtractPlugin({
				filename: "style.css",
			}),
			new webpack.DefinePlugin({
				__VUE_OPTIONS_API__: true,
				__VUE_PROD_DEVTOOLS__: isDevelopmentMode,
				__VUE_PROD_HYDRATION_MISMATCH_DETAILS__: false,
			}),
			new CopyWebpackPlugin({
				patterns: [
					{
						from: path.resolve("./public"),
						to: path.resolve("./source"),
					},
				],
			}),
		],
		watch: isDevelopmentMode,
		watchOptions: {
			aggregateTimeout: 300,
			poll: 1000,
			ignored: /node_modules|sources/,
		},
		devtool: isDevelopmentMode ? "source-map" : false,
	};
};
