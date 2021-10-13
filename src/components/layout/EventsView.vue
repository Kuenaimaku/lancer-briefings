<template>
	<section class="section-container" id="events">
      <div class="section-header clipped-medium-backward">
        <img src="/icons/events-icon.svg" />
        <h1>Events Log</h1>
      </div>
      <div class="section-content-container">
        <Markdown :source="events" class="markdown" />
      </div>
    </section>
</template>

<script>

import Markdown from 'vue3-markdown-it';

export default {
	components: {
		Markdown
	},
	props: {
		events: {
			type: String,
			required: true,
		}
	}
}
</script>