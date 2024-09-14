import daisyui from 'daisyui';
import defaultTheme from 'tailwindcss/defaultTheme';

/** @type {import('tailwindcss').Config} */
export default {
	content: [
		'./src/**/*.{js,vue}',
		'./layout/**/*.ejs',
		'./scripts/**/*.js',
		'../../submodule/content/content/**/*.md',
	],
	plugins: [daisyui],
	theme: {
		extend: {
			colors: {
				src: {
					blue: '#87cefa',
					green: '#66ffe6',
					purple: '#7b68ee',
					yellow: '#ffff74',
				},
			},
			fontFamily: {
				default: ['LXGW WenKai', 'Noto Color Emoji', ...defaultTheme.fontFamily.serif],
			},
		},
	},
	/** @type {import('daisyui').Config} */
	daisyui: {
		logs: false,
		themes: ['nord'],
		darkTheme: 'nord',
	},
};
