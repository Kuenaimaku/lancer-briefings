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
	</div>
</template>

<script>

export default {
	components: {
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
	}
}
</script>