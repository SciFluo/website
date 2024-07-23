<template>
	<div class="flex justify-center">
		<div class="card w-10/12 space-y-5 p-10">
			<h1 class="text-xl">搜索</h1>
			<div class="flex justify-center">
				<div class="relative flex w-4/6 items-center">
					<span class="top-50 absolute left-2" v-html="searchIcon"></span>
					<input
						type="text"
						name="搜索"
						class="input-src-blue input h-12 w-full rounded-xl border bg-transparent px-9 py-5"
						placeholder="搜索..."
						v-html="searchContent" />
				</div>
			</div>
		</div>
	</div>
</template>

<script>
import searchIcon from '@material-design-icons/svg/outlined/search.svg';

export default {
	data() {
		return {
			searchIcon,
			searchContent: '',
		};
	},
};
</script>
