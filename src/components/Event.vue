<template>
	<div class="event">
		<div class="name">
			<h1>{{ event.location }} // {{ event.time }}</h1>
			<h2>{{ event.title }}</h2>
		</div>
		<img class="thumbnail" :src="event.thumbnail" />
		<div class="preview">
			{{ getPreview }}
		</div>
		<a @click.prevent="selectEvent">Read More</a>
	</div>
</template>

<script>
import EventModal from "@/components/modals/EventModal.vue";

import removeMd from "remove-markdown";

export default {
	name: "Event",
	components: {
		EventModal,
	},
	props: {
		event: {
			type: Object,
			required: true,
		},
	},
	data() {
		return {
			removeMd,
		};
	},
	computed: {
		getPreview() {
			return this.removeMd(this.event.content).substring(0, 200) + "...";
		},
	},
	methods: {
		selectEvent() {
			this.$emit('select-event', this.event)
		}
	}
}
</script>
