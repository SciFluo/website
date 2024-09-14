'use strict';

hexo.extend.filter.register('markdown-it:renderer', md => {
	// 保留原始的 link_open 渲染函数
	const defaultRender =
		md.renderer.rules.link_open ||
		function (tokens, index, options, env, self) {
			return self.renderToken(tokens, index, options);
		};

	md.renderer.rules.link_open = function (tokens, index, options, env, self) {
		const token = tokens[index];
		const hrefIndex = token.attrIndex('href');

		if (hrefIndex >= 0) {
			const href = token.attrs[hrefIndex][1];

			// 替换 .md 为 .html
			if (href.endsWith('.md')) {
				token.attrs[hrefIndex][1] = href.replace(/\.md$/, '.html');
			}
		}

		return defaultRender(tokens, index, options, env, self);
	};
});
