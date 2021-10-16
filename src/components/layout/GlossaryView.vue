<template>
	<div class="glossary-container">
		<Markdown class="markdown" :source="markdown" />
	</div>
</template>

<script>
import Markdown from 'vue3-markdown-it';

export default {
	components: {
		Markdown
	},
	data() {
		return {
			markdown: ""
		}
	},
	created() {
		let self = this;
		let md = `/glossary.md`
		var client = new XMLHttpRequest();
		client.open('GET', md);
		client.onreadystatechange = function () {
			self.markdown = client.responseText;
		}
		client.send();
	}
}
</script>