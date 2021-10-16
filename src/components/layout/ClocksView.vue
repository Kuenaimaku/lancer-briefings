<template>
	<div class="clocks-list-container">
		<Clock v-for="item in this.clocks" :key="item.name" :clock="item" />
	</div>
</template>

<script>
import Clock from '@/components/Clock.vue';

export default {
	components: {
		Clock
	},
	props: {
		clocks: {
			type: Array,
			required: true,
		}
	},
}
</script>