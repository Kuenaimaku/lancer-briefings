<template>
	<div class="mission" :class="[{ active: isActive }, this.mission.status]">
		<div class="name">
			<h1>Mission // {{ mission.slug }}</h1>
			<h2>{{ mission.name }}</h2>
		</div>
		<div class="status" :class="this.mission.status">
			{{ missionStatus }}
			<img :src="icon" />
		</div>
	</div>
</template>

<script>
export default {
	components: {
	},
	props: {
		mission: {
			type: Object,
			required: true,
		},
		selected: {
			type: String,
			required: true,
		}
	},
	computed: {
		icon() {
			return `/icons/mission-${this.mission.status}.svg`
		},
		missionStatus() {
			if (this.mission.status === "start") return "Current\nBriefing"
			if (this.mission.status === "partial-success") return "Partial\nSuccess"
			if (this.mission.status === "success") return "Mission\nSuccess"
			if (this.mission.status === "failure") return "Mission\nFailure"
		},
		isActive() {
			return this.mission.slug === this.selected;
		}
	}
}
</script>