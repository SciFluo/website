/** @param {import('markdown-it/dist/index.cjs.js')} md */
module.exports = md => {
	md.renderer.rules.heading_open = (tokens, idx) => {
		const token = tokens[idx];
		const tag = token.tag;

		// 直接从下一个 token 获取标题内容，并做 HTML 转义和空格替换
		let title = md.utils.escapeHtml(tokens[idx + 1].content.trim());

		// 生成带有 id 属性的 heading 标签
		return `<${tag} id="${title.replace(/\s+/g, '_')}"><span>`;
	};

	md.renderer.rules.heading_close = (tokens, idx) => {
		const tag = tokens[idx].tag;
		return `</span></${tag}>`;
	};
};
