'use strict';

var hexo = hexo || {};

// 首页
hexo.extend.generator.register('home', function (locals) {
	return {
		path: 'index.html',
		data: {},
		layout: ['layout'],
	};
});

// 探索
hexo.extend.generator.register('explore', function (locals) {
	return {
		path: 'explore/index.html',
		data: {
			title: '探索',
		},
		layout: ['layout'],
	};
});

// 地图
hexo.extend.generator.register('map', function (locals) {
	return {
		path: 'map/index.html',
		data: {
			title: '地图',
		},
		layout: ['layout'],
	};
});

// 设置
hexo.extend.generator.register('settings', function (locals) {
	return {
		path: 'settings/index.html',
		data: {
			title: '设置',
		},
		layout: ['layout'],
	};
});

// 404
hexo.extend.generator.register('404', function (locals) {
	return {
		path: '404.html',
		data: {
			title: '找不到页面',
		},
		layout: ['layout'],
	};
});

// 搜索
hexo.extend.generator.register('search', function (locals) {
	return {
		path: 'search.html',
		data: {
			title: '搜索',
		},
		layout: ['layout'],
	};
});

// Wiki 所有页面
hexo.extend.generator.register('Wiki all pages', function (locals) {
	return {
		path: 'wiki/all_pages/index.html',
		data: {
			toc: false,
			giscus: false,
			title: 'Wiki 所有页面',
		},
		layout: ['layout'],
	};
});
