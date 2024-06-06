'use strict';

var hexo = hexo || {};

hexo.extend.filter.register('markdown-it:renderer', md => {
	md.renderer.rules.image = (tokens, idx) => {
		const token = tokens[idx];
		const src = token.attrs[token.attrIndex('src')][1];
		const alt = token.content;
		const title = token.attrs[token.attrIndex('title')][1] || alt;

		const width = token.attrs[token.attrIndex('width')]
			? `width="${token.attrs[token.attrIndex('width')][1]}"`
			: '';
		const height = token.attrs[token.attrIndex('height')]
			? `height="${token.attrs[token.attrIndex('height')][1]}"`
			: '';

		return `<a href="${src}" data-fancybox data-caption="${alt}">
					<img alt="${alt}" class="lazy" data-src="${src}" title="${title}" data-noindex="false" ${width} ${height} />
				</a>`;
	};
});
