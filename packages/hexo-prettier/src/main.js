'use strict';

var hexo = hexo || {};
const fs = require('node:fs');
const path = require('node:path');
const prettier = require('prettier');

// prettier 配置
/** @type {import('prettier').Config} */
const prettierConfig = JSON.parse(fs.readFileSync(path.resolve(hexo.base_dir, '.prettierrc.json'), 'utf-8'));
prettierConfig.parser = 'html';
delete prettierConfig.plugins;
delete prettierConfig.overrides;
delete prettierConfig.tailwindConfig;

if (hexo.env.cmd === 'server') {
	hexo.extend.filter.register(
		'after_render:html',
		function (htmlContent) {
			return prettier.format(htmlContent, prettierConfig);
		},
		1000,
	);
}
