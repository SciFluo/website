'use strict';

var hexo = hexo || {};

/*
	const routes = [
		{ path: 'wiki/*', template: 'page/wiki/wiki.ejs' },
		{ path: '404.html', template: 'page/404.ejs' },
		{ path: 'index.html', template: 'page/index.ejs' },
		{ path: 'map/index.html', template: vuePages },
		{ path: 'settings/index.html', template: vuePages },
	];
*/

// 首页
hexo.extend.generator.register('home', () => {
	return {
		path: 'index.html',
		data: {},
		layout: 'layout',
	};
});

// 百科
hexo.extend.generator.register('wiki', () => {
	return {
		path: 'wiki/index.html',
		data: {
			title: '百科',
		},
		layout: 'pages/wiki_index',
	};
});

// 探索
hexo.extend.generator.register('explore', () => {
	return {
		path: 'explore/index.html',
		data: {
			title: '探索',
		},
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
