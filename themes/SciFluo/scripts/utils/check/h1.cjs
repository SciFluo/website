'use strict';

const cheerio = require('cheerio');
var hexo = hexo || {};

hexo.extend.filter.register('after_post_render', function (data) {
	const $ = cheerio.load(data.content);
	const h1Tags = $('h1');

	if (h1Tags.length > 0) {
		console.warn('========== Start ==========');
		console.warn('发现存在 <h1> 标签');
		h1Tags.each((index, element) => {
			const h1Content = $(element).text();
			console.warn(`内容：${h1Content}`);
		});
		console.warn(`位置：${data.path}`);
		console.warn(`URL：${data.url}`);
		console.warn('========== End ==========');
	}
});
