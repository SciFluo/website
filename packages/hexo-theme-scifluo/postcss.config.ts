import tailwindcss from 'tailwindcss';
import postcssImport from 'postcss-import';
import postcssPresetEnv from 'postcss-preset-env';
import type { Config } from 'postcss-load-config';

export default {
	plugins: [
		postcssImport(),
		tailwindcss(),
		postcssPresetEnv({
			stage: 0,
		}),
	],
} satisfies Config;
