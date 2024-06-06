'use strict';

const cheerio = require('cheerio');
var hexo = hexo || {};

const checkDuplicateIds = (htmlString, data) => {
	const idSet = new Set();
	const duplicateIds = [];

	const $ = cheerio.load(htmlString);
	const allElements = $('*');

	allElements.each((index, element) => {
		const elementId = $(element).attr('id');

		if (elementId) {
			if (idSet.has(elementId)) {
				duplicateIds.push(elementId);
			} else {
				idSet.add(elementId);
			}
		}
	});

	return { duplicates: duplicateIds, path: data.path, url: data.url };
};

hexo.extend.filter.register('after_render:html', (htmlContent, data) => {
	const { duplicates, path, url } = checkDuplicateIds(htmlContent, data);
	if (duplicates.length > 0) {
		console.warn('========== Start ==========');
		console.warn('发现重复的ID:', duplicates);
		console.warn(`位置：${path}`);
		console.warn(`URL：${url}`);
		console.warn('========== End ==========');
	}
});
