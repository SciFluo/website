<template>
	<input
		type="checkbox"
		class="toggle rounded-full checked:border-src-blue checked:bg-src-blue"
		:checked="getBooleanConfig(this.$props.storageKey, this.$props.defaultValue)"
		@change="toggleEevent" />
</template>

<script>
import { toast } from 'vue3-toastify';
import Config from '../../../js/utils/config.js';

export default {
	props: {
		storageKey: {
			type: String,
			required: true,
		},
		defaultValue: {
			type: Boolean,
			required: true,
		},
	},
	methods: {
		getBooleanConfig: Config.getBooleanConfig,
		toggleEevent: function (event) {
			localStorage.setItem(this.$props.storageKey, event.target.checked);
			toast('设置已保存', {
				position: toast.POSITION.TOP_RIGHT,
				type: 'success',
				autoClose: 800,
				transition: 'bounce',
			});
		},
	},
};
</script>
