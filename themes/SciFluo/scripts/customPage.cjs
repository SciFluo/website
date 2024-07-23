'use strict';

var hexo = hexo || {};

// 首页
hexo.extend.generator.register('home', () => {
	return {
		path: 'index.html',
		data: {},
		layout: 'layout',
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
