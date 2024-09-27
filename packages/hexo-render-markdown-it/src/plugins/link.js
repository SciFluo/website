const url = require('node:url');
const path = require('path');

/** @param {import('markdown-it/dist/index.cjs.js')} md */
module.exports = md => {
	md.renderer.rules.link_open = (tokens, idx, options, env, self) => {
		const token = tokens[idx];
		const attrs = Object.fromEntries(token.attrs);

		// 去除结尾的 'index.html' 或 'index.md'
		if (attrs.href.endsWith('index.html') || attrs.href.endsWith('index.md')) {
			attrs.href = path.dirname(attrs.href); // 获取上一级目录
		}

		// 将末尾的 .md 替换为 .html
		if (attrs.href.endsWith('.md')) {
			attrs.href = attrs.href.slice(0, -3) + '.html'; // 将 .md 替换为 .html
		}

		// 设置 href 和 target 属性
		token.attrSet('href', attrs.href);
		token.attrSet('target', '_blank');

		// 返回渲染后的 token
		return self.renderToken(tokens, idx, options);
	};
};
