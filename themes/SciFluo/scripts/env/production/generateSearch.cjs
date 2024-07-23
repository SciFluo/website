'use strict';

var hexo = hexo || {};
const searchDatabase = [];

/*
if (hexo.env.cmd !== 'server') {
	hexo.extend.filter.register(
		'after_render:html',
		function (htmlContent, data) {
			searchDatabase.push(htmlContent);
		},
		1002,
	);
	process.on('exit', function () {
		console.log(searchDatabase.length);
	});
}
*/
