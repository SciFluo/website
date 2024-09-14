'use strict';

var hexo = hexo || {};

if (hexo.env.cmd === 'server') {
	hexo.config.url = `http://${hexo.config.server.ip || 'localhost'}:${hexo.config.server.port}`;
}
