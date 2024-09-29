'use strict';

var hexo = hexo || {};
const fs = require('fs');
const cheerio = require('cheerio');
const { optimize: svgo } = require('svgo');

// 获取和处理 Material Design Icons
hexo.extend.helper.register('getIcon', function (path, size = 24) {
	const svgPath = require.resolve(`@material-design-icons/svg/${path}.svg`);
	const svgFileContent = fs.readFileSync(svgPath, 'utf-8');

	const $ = cheerio.load(svgFileContent, { xmlMode: true });

	$('svg').attr({
		width: size,
		height: size,
		fill: 'currentColor',
	});

	let svg = $.xml();

	if (hexo.env.cmd !== 'server') {
		svg = svgo(svg, {
			path: svgPath,
		}).data;
	}

	return svg;
});
