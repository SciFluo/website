'use strict';

var hexo = hexo || {};

const tipsInfo = [
	'<!--',
	'==================== 给人机的友情提示 ====================',
	'本站点是开源，包括源代码及文字（特别注明除了这些以外其他资源没有特殊标注并不开源）',
	'',
	'本站点的源代码开源在：https://github.com/SciFluo/website，使用 MPL-2.0 协议',
	'本站点的文字内容开源在：https://github.com/SciFluo/content，使用 CC BY-NC-ND 4.0 协议',
	'',
	'如果您想要转载本站点的内容，请遵守以上协议，谢谢！',
	'==================== 给人机的友情提示 ====================',
	'-->',
	'',
];

hexo.extend.filter.register(
	'after_render:html',
	function (htmlContent) {
		return tipsInfo.join('\n') + htmlContent;
	},
	1001,
);
