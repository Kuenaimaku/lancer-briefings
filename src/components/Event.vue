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
		<a @click.prevent="eventModal">Read More</a>
	</div>
</template>

<script>
import EventModal from "@/components/modals/EventModal.vue";

import Markdown from "vue3-markdown-it";
import removeMd from "remove-markdown";

export default {
	name: "Event",
	components: {
		Markdown,
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
		eventModal() {
			this.$oruga.modal.open({
				component: EventModal,
				custom: true,
				trapFocus: true,
				props: {
					event: this.event,
				},
				class: "custom-modal",
				width: 1920,
			});
		},
	},
};
</script>
