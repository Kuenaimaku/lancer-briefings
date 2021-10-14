<template>
	<div class="person">
		<img :src="portrait" class="person-portrait" />
		<div class="person-loadout">
			<div class="name">
				<h1>Name or Legal Alias</h1>
				<h2>{{ person.name }} ({{ person.pronouns }})</h2>
			</div>
			<div class="name">
				<h1>Affiliation</h1>
				<h2>{{person.affiliation}}</h2>
			</div>
			<div class="code">{{person.notes}}</div>
		</div>
		<Markdown class="markdown" :source="markdown"/>
	</div>
</template>

<script>

import Markdown from "vue3-markdown-it";

export default {
	components: {
		Markdown
	},
	data(){
		return{
			markdown: ""
		}
	},
	props: {
		person: {
			type: Object,
			required: true,
		}
	},
	computed: {
		portrait() {
			return `/npcs/${this.person.name}.jpg`
		}
	},
	created(){
		let self = this;
      let md = `/npcs/${self.person.name}.md`
      var client = new XMLHttpRequest();
      client.open('GET', md);
      client.onreadystatechange = function () {
        self.markdown = client.responseText;
      }
      client.send();
	}
}
</script>