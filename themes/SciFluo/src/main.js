import './less/main.less';
import pangu from 'pangu';
import '@fontsource/roboto';
import toc from './js/toc.js';
import '@fontsource/noto-sans';
import utils from './js/utils.js';
import Search from './js/search.js';
import '@fontsource/noto-color-emoji';
import 'vue3-toastify/dist/index.css';
import LazyLoad from 'vanilla-lazyload';
import { Fancybox } from '@fancyapps/ui';
import vuePages from './vue/VuePages.js';
import 'sweetalert2/src/sweetalert2.scss';
import Config from './js/utils/config.js';
import 'overlayscrollbars/overlayscrollbars.css';
import '@fancyapps/ui/dist/fancybox/fancybox.css';
import { OverlayScrollbars } from 'overlayscrollbars';
import '@chinese-fonts/lxgwwenkai/dist/LXGWWenKai-Regular/result.css';
import { zh_CN as Fancybox_zh_CN } from '@fancyapps/ui/dist/fancybox/l10n/zh_CN.esm.js';

const initialize = () => {
	Promise.all([
		new Promise((resolve, reject) => {
			// 初始化OverlayScrollbars
			OverlayScrollbars(document.body, {});
			resolve();
		}),
		new Promise((resolve, reject) => {
			// 初始化搜索
			Search();
			resolve();
		}),
		new Promise((resolve, reject) => {
			// 初始化 Vue 页面
			vuePages();
			resolve();
		}),
		new Promise((resolve, reject) => {
			// 初始化 Wiki 和 Book 页面
			if (utils.isURL('/wiki/*') || utils.isURL('/book/*')) {
				if (Config.fast['settings.toc.scroll_change_url.enable']()) {
					pangu.spacingElementById('wiki-content');
				}

				if (document.getElementById('toc-root')) {
					toc();
					OverlayScrollbars(document.querySelector('#toc-root'), {});
				}
				// 初始化 Vanilla LazyLoad
				let lazyLoadInstance = new LazyLoad({});
				lazyLoadInstance.update();

				// 初始化 Fancybox
				Fancybox.bind('[data-fancybox]', {
					l10n: Fancybox_zh_CN,
				});
			}
			resolve();
		}),
	]);
};

if (document.readyState !== 'loading') {
	initialize();
} else {
	document.addEventListener('DOMContentLoaded', initialize);
}
