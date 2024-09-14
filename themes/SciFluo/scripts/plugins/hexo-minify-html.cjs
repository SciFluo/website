'use strict';

var hexo = hexo || {};
const { minify } = require('html-minifier-terser');

if (hexo.env.cmd !== 'server') {
	/** @type {import('html-minifier-terser').Options} */
	const minifyConfig = {
		removeAttributeQuotes: false, // class="foo-bar" to class=foo-bar
		removeComments: true,
		collapseWhitespace: true,
		removeEmptyAttributes: true,
		minifyCSS: true,
		minifyJS: true,
	};

	hexo.extend.filter.register(
		'after_render:html',
		async function (htmlContent) {
			return await minify(htmlContent, minifyConfig);
		},
		1000,
	);
}
