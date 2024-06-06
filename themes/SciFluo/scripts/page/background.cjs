'use strict';
const cheerio = require('cheerio');
var hexo = hexo || {};

hexo.extend.filter.register('after_render:html', function (htmlContent, data) {
	if (data.page.background) {
		const $ = cheerio.load(htmlContent);
		$('body').append(
			`
			<div class="bg-full" style="background-image: url('${data.page.background}')">
			</div>
			`,
		);
		return $.html();
	}
});
