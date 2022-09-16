<template>
	<div class="segmented-progressbar">
		<div
		  v-for="index in value"
		  :key="index"
		  class="item"
		  :style="'background-color: ' + color"></div>
		<div v-for="index in max - value" :key="index" class="item"></div>
	</div>
</template>

<script>
export default {
	name: "ProgressBar",
	components: {},
	props: {
		max: {
			type: Number,
			required: true,
		},
		value: {
			type: Number,
			required: true,
		},
		color: {
			type: String,
			required: true,
		},
	},
	methods: {},
};
</script>
