'use strict';

var hexo = hexo || {};
const fs = require('node:fs');
const xml2js = require('xml2js');
const path = require('node:path');
const { URL } = require('node:url');
const { DateTime } = require('luxon');

if (hexo.env.cmd !== 'server') {
	const robotsDisallowed = fs
		.readFileSync(path.resolve(hexo.theme_dir, 'public', 'robots.txt'), 'utf-8')
		.split('\n')
		.filter(line => line.startsWith('Disallow:'))
		.map(line => line.split(':')[1].trim());

	/**
	 * 判断 URL 是否在 robots.txt 中被禁止
	 * @param {string} url URL
	 * @returns {boolean} 是否被禁止
	 */
	const isDisallowed = url => {
		if (robotsDisallowed.length === 0) return false;

		return robotsDisallowed.some(disallowed => {
			// 添加开头斜杠以保证匹配
			const normalizedUrl = url.startsWith('/') ? url : `/${url}`;
			return normalizedUrl.startsWith(disallowed);
		});
	};

	// 计算 URL 优先级
	const calculatePriority = pathname => {
		switch (pathname) {
			case '/':
				return '1.0';
			case '/wiki/':
				return '0.9';
			case '/book/':
				return '0.8';
			default:
				return '0.6';
		}
	};

	// 生成 sitemap.xml
	const sitemap = {
		urlset: {
			$: { xmlns: 'http://www.sitemaps.org/schemas/sitemap/0.9' },
			url: [],
		},
	};

	hexo.extend.filter.register(
		'after_render:html',
		(htmlContent, data) => {
			if (!isDisallowed(data.path)) {
				const url = new URL(hexo.config.url, hexo.path);

				if (data.path.endsWith('index.html')) url.pathname = data.path.replace('index.html', '');

				if (sitemap.urlset.url.some(u => u.loc[0] === url.href)) return; // 避免重复添加

				sitemap.urlset.url.push({
					loc: [url.href],
					lastmod: [DateTime.now().toFormat('yyyy-MM-dd')],
					changefreq: ['weekly'],
					priority: [calculatePriority(url.pathname)],
				});
			}
		},
		1002,
	);

	process.on('beforeExit', () => {
		const xml = new xml2js.Builder().buildObject(sitemap);

		fs.writeFileSync(path.resolve(hexo.public_dir, 'sitemap.xml'), xml);

		hexo.log.info('Generated Sitemap: sitemap.xml');
	});
}
