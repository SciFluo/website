import tailwindcss from 'tailwindcss';
import postcssImport from 'postcss-import';
import postcssPresetEnv from 'postcss-preset-env';

export default {
	ident: 'postcss',
	plugins: [
		postcssImport(),
		tailwindcss(),
		postcssPresetEnv({
			stage: 0,
		}),
	],
};
