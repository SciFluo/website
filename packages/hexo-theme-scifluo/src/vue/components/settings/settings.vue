<template>
	<div class="card mx-auto my-5 w-5/6 space-y-10 p-10">
		<div class="border-b pb-2 text-center">
			<h1 class="text-3xl">设置</h1>
		</div>
		<div class="space-y-5">
			<div class="space-y-2">
				<h2 class="text-xl">Pangu</h2>
				<div class="setting-item">
					<SciFluo-Switch storage-key="settings.pangu.enable" :default-value="false"></SciFluo-Switch>
					<label>启用 Pangu</label>
				</div>
			</div>
			<div class="space-y-2">
				<h2 class="text-xl">Toc</h2>
				<div class="setting-item">
					<SciFluo-Switch
						storage-key="settings.toc.scroll_change_url.enable"
						:default-value="true"></SciFluo-Switch>
					<label>启用滑动页面自动修改URL锚点</label>
				</div>
			</div>
		</div>
		<div>
			<button id="reset" class="btn btn-outline btn-primary" @click="resetSettings">重置</button>
		</div>
	</div>
</template>

<script>
import Switch from './switch.vue';
import { toast } from 'vue3-toastify';

export default {
	name: 'SciFluoPagesSettings',
	components: {
		'SciFluo-Switch': Switch,
	},
	methods: {
		resetSettings() {
			for (let key in localStorage) {
				if (key.startsWith('settings.')) {
					localStorage.removeItem(key);
				}
			}
			toast('设置已重置', {
				position: toast.POSITION.TOP_RIGHT,
				type: 'success',
				autoClose: 800,
				transition: 'bounce',
			});
			setTimeout(() => {
				window.location.reload();
			}, 200);
		},
	},
};
</script>

<style scoped>
.setting-item {
	@apply flex space-x-2;
}
</style>
