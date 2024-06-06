'use strict';

var hexo = hexo || {};
const cheerio = require('cheerio');
const markdownIt = require('markdown-it');

const getTocTree = HTML => {
	const $ = cheerio.load(HTML);
	const toc = $('h2, h3, h4, h5, h6')
		.map((index, element) => ({
			number: parseInt(element.name.substring(1)) - 2,
			name: $(element).text().trim(),
			id: $(element).attr('id').trim(),
		}))
		.get();
	return toc;
};

const getTocTreeToMarkdown = tocTree => {
	let toc = '';

	for (const currentItem of tocTree) {
		const indentation = ' '.repeat(currentItem.number * 2);
		toc += `${indentation}- [${currentItem.name}](#${currentItem.id} "${currentItem.name}")\n`;
	}

	return toc;
};

const getTocTreeToHTML = tocMarkdown => {
	const md = new markdownIt();
	return md.render(tocMarkdown);
};

hexo.extend.filter.register('after_post_render', data => {
	if (data.toc !== false) {
		const tocTree = getTocTree(data.content);
		const TocTreeToMarkdown = getTocTreeToMarkdown(tocTree);
		const TocTreeToHTML = getTocTreeToHTML(TocTreeToMarkdown);
		data.toc_content = TocTreeToHTML;
	}
	return data;
});
