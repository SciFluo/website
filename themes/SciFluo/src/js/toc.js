import utils from './utils.js';
import Config from './utils/config.js';

const scrollToNearestHeading = () => {
	let scrollTimer;

	const handleScroll = () => {
		clearTimeout(scrollTimer);

		scrollTimer = setTimeout(() => {
			const scrollPosition = window.scrollY || document.documentElement.scrollTop;

			const headings = document.querySelectorAll(
				'#wiki-content h2, #wiki-content h3, #wiki-content h4, #wiki-content h5, #wiki-content h6',
			);

			let closestHeadingId;
			let closestDistance = Infinity;

			headings.forEach(heading => {
				const distance = Math.abs(heading.offsetTop - scrollPosition);
				if (distance < closestDistance) {
					closestDistance = distance;
					closestHeadingId = heading.id;
				}
			});

			history.replaceState(null, null, '#' + closestHeadingId);
		}, 100);
	};

	window.addEventListener('scroll', handleScroll);
};

const updateTocHighlightOnScroll = () => {
	let scrollTimer;

	const handleScroll = () => {
		clearTimeout(scrollTimer);

		scrollTimer = setTimeout(() => {
			const scrollPosition = window.scrollY || document.documentElement.scrollTop;

			const headings = document.querySelectorAll(
				'#wiki-content h2, #wiki-content h3, #wiki-content h4, #wiki-content h5, #wiki-content h6',
			);

			let closestHeadingId;
			let closestDistance = Infinity;

			headings.forEach(heading => {
				const distance = Math.abs(heading.offsetTop - scrollPosition);
				if (distance < closestDistance) {
					closestDistance = distance;
					closestHeadingId = encodeURIComponent(heading.id);
				}
			});

			// 移除上一个select.toc
			const previousLink = document.querySelector(`#toc-root a[class="select-toc"]`);

			if (previousLink) {
				previousLink.classList.remove('select-toc');
			}

			// 添加select.toc
			const link = document.querySelector(`#toc-root a[href="#${closestHeadingId}"]`);
			if (link) {
				link.classList.add('select-toc');
				link.scrollIntoView({ behavior: 'smooth' });
			}
		}, 20);
	};

	window.addEventListener('scroll', handleScroll);
};

export default () => {
	if (Config.getBooleanConfig('settings.toc.scroll_change_url.enable', true)) {
		scrollToNearestHeading();
	}
	if (utils.isURL('/wiki/*')) {
		updateTocHighlightOnScroll();
	}
};
