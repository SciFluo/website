import "./less/main.less";
import pangu from "pangu";
import toc from "./js/toc.js";
import "@fontsource/noto-serif";
import utils from "./js/utils.js";
import "@fontsource/noto-serif-sc";
import "@fontsource/noto-color-emoji";
import "vue3-toastify/dist/index.css";
import LazyLoad from "vanilla-lazyload";
import { Fancybox } from "@fancyapps/ui";
import vuePages from "./vue/VuePages.js";
import "sweetalert2/src/sweetalert2.scss";
import Config from "./js/utils/config.js";
import "overlayscrollbars/overlayscrollbars.css";
import "@fancyapps/ui/dist/fancybox/fancybox.css";
import { OverlayScrollbars } from "overlayscrollbars";
import { zh_CN as Fancybox_zh_CN } from "@fancyapps/ui/dist/fancybox/l10n/zh_CN.esm.js";

const initialize = () => {
	// 初始化OverlayScrollbars
	OverlayScrollbars(document.body, {});

	// 初始化 Vue 页面
	vuePages();

	// 初始化 Wiki 页面
	if (utils.isURL("/wiki/*") || utils.isURL("/book/*")) {
		if (Config.fast["settings.toc.scroll_change_url.enable"]()) {
			pangu.spacingElementById("wiki-content");
		}

		if (document.getElementById("toc-root")) {
			toc();
			OverlayScrollbars(document.querySelector("#toc-root"), {});
		}
		// 初始化 Vanilla LazyLoad
		var lazyLoadInstance = new LazyLoad({});
		lazyLoadInstance.update();

		// 初始化 Fancybox
		Fancybox.bind("[data-fancybox]", {
			l10n: Fancybox_zh_CN,
		});
	}
};

if (document.readyState !== "loading") {
	initialize();
} else {
	document.addEventListener("DOMContentLoaded", initialize);
}
