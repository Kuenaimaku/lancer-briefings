<template>
	<section id="events-logs" :class="{ animate: animate }" class="section-container">
		<div style="height: 52px; overflow: hidden">
			<div class="section-header clipped-medium-backward-events-logs">
				<img src="/icons/events.svg" />
				<h1>Events Log</h1>
			</div>
			<div class="rhombus-back">&nbsp;</div>
		</div>
		<div class="section-content-container">
			<div class="event-list-container">
				<!-- TODO: Create new EventsLog.vue for a new layout on this view -->
				<Event
				  v-for="item in events"
				  :key="item.title"
				  :event="item"
				  :animate="animate" />
			</div>
		</div>
	</section>
</template>

<script>
import Markdown from "vue3-markdown-it";
import Event from "@/components/Event.vue";

export default {
	components: {
		Markdown,
		Event,
	},
	props: {
		animate: {
			type: Boolean,
			required: true,
		},
		events: {
			type: Array,
			required: true,
		},
	},
	data() {
		return {};
	},
};
</script>
