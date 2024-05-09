"use strict";
const cheerio = require("cheerio");
var hexo = hexo || {};

const isURL = (path, url) => {
	const regexPattern = new RegExp("^" + url.replace(/[*]/g, ".*") + "$");
	return regexPattern.test(path);
};

hexo.extend.filter.register("after_render:html", function (htmlContent, data) {
	if (
		isURL(data.page.source, "wiki/*") ||
		isURL(data.page.source, "book/*")
	) {
		if (data.page.giscus !== false) {
			const $ = cheerio.load(htmlContent);
			$("head").append(
				`
					<script src="https://giscus.app/client.js"
							data-repo="SciFluo/SciFluo-Discussions"
							data-repo-id="R_kgDOL3ss4w"
							data-category="Giscus"
							data-category-id="DIC_kwDOL3ss484CfKye"
							data-mapping="pathname"
							data-strict="0"
							data-reactions-enabled="1"
							data-emit-metadata="0"
							data-input-position="top"
							data-theme="light"
							data-lang="zh-CN"
							data-loading="lazy"
							crossorigin="anonymous"
							async>
					</script>
				`
			);
			return $.html();
		}
	}
});
