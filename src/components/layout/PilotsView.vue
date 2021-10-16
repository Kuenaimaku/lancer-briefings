<template>
	<div class="pilot-list-container">
		<Pilot v-for="item in this.pilots" :key="item.callsign" :pilot="item" />
	</div>
</template>

<script>
import Pilot from '@/components/Pilot.vue';

export default {
	components: {
		Pilot
	},
	props: {
		pilots: {
			type: Object,
			required: true,
		}
	},
}
</script>