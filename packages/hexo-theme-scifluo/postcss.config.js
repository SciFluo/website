import tailwindcss from 'tailwindcss';
import postcssImport from 'postcss-import';
import postcssPresetEnv from 'postcss-preset-env';

/** @type {import("postcss-load-config").Config} */
export default {
	plugins: [
		postcssImport(),
		tailwindcss(),
		postcssPresetEnv({
			stage: 0,
		}),
	],
};
