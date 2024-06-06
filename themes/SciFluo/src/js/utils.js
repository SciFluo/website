/**
 * 检查当前URL是否与给定模式匹配。
 *
 * @param {string} url - 要检查的URL模式，支持通配符(*)匹配。
 * @returns {boolean} - 如果当前URL与模式匹配，则返回true；否则返回false。
 */
const isURL = url => {
	const currentUrl = window.location.pathname;

	const regexPattern = new RegExp('^' + url.replace(/[*]/g, '.*') + '$');

	return regexPattern.test(currentUrl);
};

/**
 * 使用指定路径获取对象中嵌套属性的值。
 *
 * @param {object} obj - 要从中检索值的对象。
 * @param {string} path - 指定属性的路径，由点分隔。
 * @returns {*} - 指定属性的值，如果未找到属性则返回undefined。
 */
const getObjectValueByPath = (obj, path) => {
	const properties = path.split('.');
	let currentValue = obj;

	for (const property of properties) {
		if (currentValue.hasOwnProperty(property)) {
			currentValue = currentValue[property];
		} else {
			currentValue = undefined;
			break;
		}
	}

	return currentValue;
};

export default {
	isURL,
	getObjectValueByPath,
};
