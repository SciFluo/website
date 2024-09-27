'use strict';

var hexo = hexo || {};

hexo.extend.helper.register('getPage', function (url) {
	const vuePages = 'page/vue.ejs';
	const routes = [
		{ path: 'wiki/*', template: 'page/wiki/wiki.ejs' },
		{ path: '404.html', template: 'page/404.ejs' },
		{ path: 'index.html', template: 'page/index.ejs' },
		{ path: 'map/index.html', template: vuePages },
		{ path: 'settings/index.html', template: vuePages },
	];

	for (const route of routes) {
		const regex = new RegExp(`^${route.path.replace(/\*/g, '.*')}$`);
		if (regex.test(url)) {
			return route.template;
		}
	}

	return 'page/index.ejs';
});

// 首页
hexo.extend.generator.register('home', () => {
	return {
		path: 'index.html',
		data: {},
		layout: 'layout',
	};
});

// 地图
hexo.extend.generator.register('map', () => {
	return {
		path: 'map/index.html',
		data: {
			title: '地图',
		},
		layout: 'layout',
	};
});

// 设置
hexo.extend.generator.register('settings', () => {
	return {
		path: 'settings/index.html',
		data: {
			title: '设置',
		},
		layout: 'layout',
	};
});

// 404
hexo.extend.generator.register('404', () => {
	return {
		path: '404.html',
		data: {
			title: '找不到页面',
		},
		layout: 'layout',
	};
});

// 搜索
hexo.extend.generator.register('search', () => {
	return {
		path: 'search.html',
		data: {
			title: '搜索',
		},
		layout: 'layout',
	};
});

// Wiki 所有页面
hexo.extend.generator.register('Wiki all pages', () => {
	return {
		path: 'wiki/all_pages/index.html',
		data: {
			toc: false,
			giscus: false,
			title: 'Wiki 所有页面',
		},
		layout: 'layout',
	};
});
