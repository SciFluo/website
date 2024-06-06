'use strict';

var hexo = hexo || {};

hexo.extend.filter.register('markdown-it:renderer', md => {
	md.renderer.rules.heading_open = (tokens, idx) => {
		const token = tokens[idx];
		const tag = token.tag;
		//const title = md.utils.escapeHtml(tokens[idx + 1].children[0].content);
		let title = md.utils.escapeHtml(tokens[idx + 1].content);
		tokens[idx + 1].children.forEach(child => {
			if (child.level === 1) {
				title = child.content;
			}
		});
		return `<${tag} id="${title.replace(/\s+/g, '_')}"><span>`;
	};

	md.renderer.rules.heading_close = (tokens, idx) => {
		const token = tokens[idx];
		const tag = token.tag;
		return `</span></${tag}>`;
	};
});
