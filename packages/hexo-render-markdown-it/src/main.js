'use strict';

var hexo = hexo || {};
const markdownIt = require('markdown-it');
const MarkdownItSub = require('markdown-it-sub');
const MarkdownItSup = require('markdown-it-sup');
const MarkdownItAttrs = require('markdown-it-attrs');
const markdownItFootvote = require('markdown-it-footnote');
const markdownItCJKBreaks = require('markdown-it-cjk-breaks');

const pluginsLink = require('./plugins/link.js');
const pluginsTitle = require('./plugins/title.js');
const pluginsImage = require('./plugins/image.js');

const md = markdownIt({
	html: true,
});

md.use(MarkdownItSub); // 下标
md.use(MarkdownItSup); // 上标
md.use(MarkdownItAttrs, {
	allowedAttributes: ['height', 'width', 'lazy'],
});
md.use(markdownItFootvote); // 脚注
md.use(markdownItCJKBreaks);

// 本地插件
md.use(pluginsLink);
md.use(pluginsTitle);
md.use(pluginsImage); // 依赖 markdown-it-attrs

hexo.extend.renderer.register(
	'md',
	'html',
	data => {
		return md.render(data.text);
	},
	true,
);
