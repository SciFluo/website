'use strict';

var hexo = hexo || {};

hexo.extend.filter.register('markdown-it:renderer', md => {
	md.renderer.rules.image = (tokens, idx) => {
		const token = tokens[idx];
		const attrs = token.attrs.reduce((acc, [name, value]) => {
			acc[name] = value;
			return acc;
		}, {});

		const { src, title, width, height, laze = 'true' } = attrs;
		const alt = token.content;
		const titleAttr = title ? `title="${title}"` : '';
		const widthAttr = width ? `width="${width}"` : '';
		const heightAttr = height ? `height="${height}"` : '';

		if (laze === 'true') {
			return `<a href="${src}" data-fancybox data-caption="${alt}">
						<img alt="${alt}" class="lazy" data-src="${src}" ${titleAttr} data-noindex="true" ${widthAttr} ${heightAttr} />
					</a>`;
		} else {
			return `<img alt="${alt}" src="${src}" ${titleAttr} data-noindex="false" ${widthAttr} ${heightAttr} />`;
		}
	};
});
