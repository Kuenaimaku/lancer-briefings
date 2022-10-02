<template>
	<section id="pilots" :class="{ animate: animate }" class="section-container">
		<div style="height: 52px; overflow: hidden">
			<div class="section-header clipped-medium-backward-pilot">
				<img src="/icons/license.svg" />
				<h1>Pilot Roster</h1>
			</div>
			<div class="rhombus-back">&nbsp;</div>
		</div>
		<div class="section-content-container">
			<div class="pilot-list-container">
				<Pilot
				  v-for="item in pilots"
				  :key="item.callsign"
				  :pilot="item"
				  :animate="animate" />
			</div>
		</div>
	</section>
</template>

<script>
import Markdown from "vue3-markdown-it";
import Pilot from "@/components/Pilot.vue";

export default {
	components: {
		Markdown,
		Pilot,
	},
	props: {
		animate: {
			type: Boolean,
			required: true,
		},
		pilots: {
			type: Array,
			required: true,
		},
	},
	data() {
		return {};
	},
};
</script>
