"use strict";
const cheerio = require("cheerio");
var hexo = hexo || {};

const isURL = (path, url) => {
	const regexPattern = new RegExp("^" + url.replace(/[*]/g, ".*") + "$");
	return regexPattern.test(path);
};

hexo.extend.filter.register("after_render:html", function (htmlContent, data) {
	const $ = cheerio.load(htmlContent);

	if (!data.page.background) {
		data.page.background = "/assets/images/background.webp";
	}
	$("body").append(
		`
		<div class="bg-full" style="background-image: url('${data.page.background}')">
		</div>
		`
	);
	return $.html();
});