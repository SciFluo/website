'use strict';

var hexo = hexo || {};

hexo.extend.filter.register('markdown-it:renderer', md => {
	// 获取原始的渲染函数
	const defaultLinkRenderer =
		md.renderer.rules.link_open ||
		function (tokens, idx, options, env, self) {
			return self.renderToken(tokens, idx, options);
		};

	// 重写 link_open 规则，添加 target="_blank"
	md.renderer.rules.link_open = (tokens, idx, options, env, self) => {
		const token = tokens[idx];
		// 添加 target="_blank" 到所有超链接
		token.attrPush(['target', '_blank']);
		// 调用原始的渲染函数
		return defaultLinkRenderer(tokens, idx, options, env, self);
	};
});
