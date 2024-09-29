/**
 * @type {import('@babel/core').TransformOptions}
 * */
export default {
	presets: [
		[
			'@babel/preset-env',
			{
				useBuiltIns: 'usage',
				corejs: 3,
			},
		],
	],
};