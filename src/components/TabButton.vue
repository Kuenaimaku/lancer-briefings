<template>
	<div :class="['main-tab-button', 'clipped-rhombus-backward', {active:hidden}]">
		<img :src="icon"/>

	</div>
</template>

<script>

export default {
	components: {
	},
	props: {
		name: {
			type: String,
			required: true,
		},
		hidden: {
			type: Boolean,
			required: true
		}
	},
	computed:{
		icon(){
			return `/icons/${this.name}-icon.svg`
		}
	}
}
</script>