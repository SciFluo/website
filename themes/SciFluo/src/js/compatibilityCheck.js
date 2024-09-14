import swal from 'sweetalert';

const isBasedOnChrome = userAgent => {
	return userAgent.includes('Chrome') || userAgent.includes('Chromium');
};

export const isWebGLSupported = () => {
	const canvas = document.createElement('canvas');
	const gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl');
	return gl !== null;
};

export const isWebGL2Supported = () => {
	const canvas = document.createElement('canvas');
	const gl = canvas.getContext('webgl2');
	return gl !== null;
};

const compatibilityCheck = async () => {
	const compatibilityReport = [];

	if (isBasedOnChrome(navigator.userAgent)) {
		compatibilityReport.push('您的浏览器是基于Chromium内核的浏览器，这可能会导致许多问题！');
	}

	if (location.protocol !== 'https:' && location.hostname !== 'localhost') {
		compatibilityReport.push('当前页面不是https协议，这会导致出现异常！');
	}

	if (!isWebGLSupported()) {
		compatibilityReport.push('您的浏览器不支持WebGL！');
	}

	if (!isWebGL2Supported()) {
		compatibilityReport.push('您的浏览器不支持WebGL2！');
	}

	if (!navigator.gpu) {
		compatibilityReport.push('您的浏览器不支持WebGPU！');
	} else if (!(await navigator.gpu.requestAdapter())) {
		compatibilityReport.push('无法请求 WebGPU 适配器！');
	}

	if (!WebAssembly) {
		compatibilityReport.push('您的浏览器不支持 WebAssembly！');
	}

	return compatibilityReport;
};

export default async () => {
	if (localStorage.getItem('tips.compatibility.check') !== 'false') {
		const compatibilityReport = await compatibilityCheck();
		if (compatibilityReport.length > 0) {
			swal({
				title: '发现兼容性问题！',
				text: compatibilityReport.join('\n'),
				icon: 'warning',
				dangerMode: true,
				closeOnEsc: false,
				closeOnClickOutside: false,
				buttons: {
					confirm: {
						text: '确定',
						value: true,
						visible: true,
						closeModal: true,
					},
					cancel: {
						text: '不再提示',
						value: false,
						visible: true,
						closeModal: true,
					},
				},
			}).then(value => {
				if (!value) {
					localStorage.setItem('tips.compatibility.check', 'false');
				}
			});
		}
	}
};
