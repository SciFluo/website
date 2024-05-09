<template>
	<div class="flex justify-center">
		<div class="card w-10/12 space-y-5 p-10">
			<h1 class="text-xl">搜索</h1>
			<form class="relative flex items-center">
				<span class="top-50 absolute left-2" v-html="searchIcon"></span>
				<input
					type="text"
					name="搜索"
					class="py-54 input input-bordered h-8 max-w-sm rounded-xl border px-9"
					placeholder="搜索..." />
			</form>
		</div>
	</div>
</template>

<script>
import searchIcon from "@material-design-icons/svg/outlined/search.svg";

export default {
	data() {
		return {
			searchIcon,
		};
	},
};
</script>
