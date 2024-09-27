const { JSDOM } = require('jsdom');

/** @param {import('markdown-it/dist/index.cjs.js')} md */
module.exports = md => {
	md.renderer.rules.image = (tokens, idx) => {
		const token = tokens[idx];
		const attrs = Object.fromEntries(token.attrs);

		// 外层 a 标签
		const dom = new JSDOM('<a></a>');
		const aElement = dom.window.document.querySelector('a');
		aElement.setAttribute('data-fancybox', 'gallery');
		aElement.setAttribute('href', attrs.src);
		aElement.setAttribute('data-caption', token.content);

		// 内层 img 标签
		const imgElement = dom.window.document.createElement('img');
		imgElement.setAttribute('alt', token.content);
		imgElement.setAttribute('data-noindex', 'true');

		// 可选 title
		if (attrs.title) {
			imgElement.setAttribute('title', attrs.title);
		}

		// 可选 width
		if (attrs.width) {
			imgElement.setAttribute('width', attrs.width);
			imgElement.style.width = `${attrs.width}px`;
		}

		// 可选 height
		if (attrs.height) {
			imgElement.setAttribute('height', attrs.height);
			imgElement.style.height = `${attrs.height}px`;
		}

		// 懒加载
		if (attrs.lazy !== 'false') {
			imgElement.classList.add('lazy');
			imgElement.setAttribute('data-src', attrs.src);
		} else {
			imgElement.setAttribute('src', attrs.src);
		}

		// 合并标签
		aElement.appendChild(imgElement);

		return dom.serialize();
	};
};
