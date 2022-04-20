<template>
	<div class="segmented-progressbar">
		<div v-for="index in (this.value)" :key="index" class="item" :style="'background-color: ' + this.color"></div>
		<div v-for="index in (this.max - this.value)" :key="index" class="item"></div>
	</div>
</template>

<script>
export default {
	name: "ProgressBar",
	props: {
		max: {
			type: Number,
			required: true,
		},
		value: {
			type: Number,
			required: true
		},
		color: {
			type: String,
			required: true
		}
	},
  components: {
  },
  methods: {},
};
</script>