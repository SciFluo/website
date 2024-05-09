"use strict";

var hexo = hexo || {};

hexo.extend.filter.register("post_permalink", function (data) {
	const parts = data.split("/").filter((part) => part !== "");

	if (parts.length > 1) {
		parts.pop();
		return parts.join("/") + "/";
	} else {
		return "/";
	}
});
