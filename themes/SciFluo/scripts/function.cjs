"use strict";

const fs = require("fs");
const cheerio = require("cheerio");
var hexo = hexo || {};

// 获取和处理 Material Design Icons
hexo.extend.helper.register("getIcon", function (path, size = 24) {
	const svgFileContent = fs.readFileSync(
		require.resolve(`@material-design-icons/svg/${path}.svg`),
		"utf-8"
	);

	const $ = cheerio.load(svgFileContent, { xmlMode: true });

	$("svg").attr("width", size);
	$("svg").attr("height", size);

	const pathElement = $("svg").first();
	if (pathElement) {
		pathElement.attr("fill", "currentColor");
	}

	return $.xml();
});
