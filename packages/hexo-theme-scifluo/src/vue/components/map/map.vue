<template>
	<div id="map" class="h-full w-full"></div>
</template>

<script>
import map from './main.js';

export default {
	name: 'SciFluoPagesMap',
	mounted() {
		map();
	},
};
</script>
