<template>
	<section class="section-container" id="pilots">
		<div style="height:52px; overflow:hidden;">
			<div class="section-header clipped-medium-backward-pilot">
				<img src="/icons/pilot-icon.svg" />
				<h1>Persons Registry</h1>
			</div>
			<div class="rhombus-back">&nbsp;</div>
		</div>
		<div class="section-content-container">
			<div class="person-list-container">
				<Person v-for="item in this.npcs" :key="item.name" :person="item" />
			</div>
		</div>
	</section>
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