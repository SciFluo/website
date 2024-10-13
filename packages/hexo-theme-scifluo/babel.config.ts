import type { TransformOptions } from '@babel/core';

export default {
	presets: [
		[
			'@babel/preset-env',
			{
				useBuiltIns: 'usage',
				corejs: 3,
			},
		],
		'@babel/preset-typescript',
	],
} satisfies TransformOptions;
