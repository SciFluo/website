const getBooleanConfig = (storageKey, defaultValue) => {
	const value = localStorage.getItem(storageKey);
	if (value === 'true') {
		return true;
	} else if (value === 'false') {
		return false;
	} else {
		return defaultValue;
	}
};

const fast = {
	'settings.pangu.enable': () => getBooleanConfig('settings.pangu.enable', false),
	'settings.toc.scroll_change_url.enable': () => getBooleanConfig('settings.toc.scroll_change_url.enable', true),
};

export default {
	getBooleanConfig,
	fast,
};
