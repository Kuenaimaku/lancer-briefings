<template>
	<div class="person-list-container">
		<Person v-for="item in this.npcs" :key="item.name" :person="item" />
	</div>
</template>

<script>
import Person from '@/components/Person.vue';

export default {
	components: {
		Person
	},
	props: {
		npcs: {
			type: Array,
			required: true,
		}
	},
}
</script>