"use strict";

var hexo = hexo || {};

const autoRegister = (name, path) => {
	hexo.extend.generator.register(name, function (locals) {
		return {
			path: path,
			data: {},
			layout: ["layout"],
		};
	});
};

autoRegister("home", "index.html"); // 首页
autoRegister("map", "map/index.html"); // 地图
autoRegister("settings", "settings/index.html"); // 设置
autoRegister("404", "404.html"); // 404页面
autoRegister("search", "search.html"); // 搜索页面
autoRegister("Wiki all pages", "wiki/all_pages/index.html"); // Wiki所有页面
