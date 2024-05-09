import daisyui from "daisyui";
import tailwindcss from "tailwindcss";
import defaultTheme from "tailwindcss/defaultTheme";

/** @type {import('tailwindcss').Config} */
export default {
	content: [
		"./src/**/*.{js,vue}",
		"./layout/**/*.ejs",
		"./scripts/**/*.js",
		"../../submodule/content/content/**/*.md",
	],
	plugins: [tailwindcss, daisyui],
	theme: {
		extend: {
			colors: {
				src: {
					blue: "#65e2ff",
					green: "#65ffc9",
					purple: "#9965ff",
					yellow: "#fff265",
				},
			},
			fontFamily: {
				serif: [
					"Noto Serif",
					"Noto Serif SC",
					"Noto Color Emoji",
					"sans-serif",
					...defaultTheme.fontFamily.serif,
				],
			},
		},
	},
	/** @type {import('daisyui').Config} */
	daisyui: {
		logs: false,
		themes: ["light"],
	},
};
