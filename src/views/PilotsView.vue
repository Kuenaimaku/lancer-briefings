<template>
	<div class="section-content-container" :class="{ animate: animateView }" :style="{ 'animation-delay': animationDelay }" id="pilots">
		<div class="pilot-list-container">
			<Pilot v-for="item in pilots" :key="item.callsign" :pilot="item" :animate="animate" />
		</div>
	</div>
</template>

<script>
import { VueMarkdownIt } from '@f3ve/vue-markdown-it';
import Pilot from "@/components/Pilot.vue";


export default {
	components: {
		VueMarkdownIt,
		Pilot,
	},
	props: {
		animate: {
			type: Boolean,
			required: true,
		},
		pilots: {
			type: Array,
			required: true,
		},
	},
	data() {
		return {
			animateView: this.animate,
			animationDelay: "0s",
			clockAnimationDelay: "2500",
		};
	},
	methods: {
		setAnimate() {
			if (this.animate) {
				this.animateView = true;
			}
			let statusAnimated = window.sessionStorage.getItem("statusAnimated");
			if (statusAnimated) {
				this.animationDelay = "0s";
			}
			if (statusAnimated === null) {
				window.sessionStorage.setItem("statusAnimated", true);
			}
		}
	}
};
</script>

<style scoped>
.pilot-list-container {
	display: flex;
	flex-wrap: wrap;
	padding: 1em;
	gap: 1em;
}

.grid-item {
	flex: 45%;
}

.pilot-list-container {
	height:calc(100vh - 96px);
}

.section-content-container {
	border: 0px solid transparent;
}

section.section-container#pilots {
	display: flex;
	flex-direction: column;
	margin: 50px 30px;
	width: 1755px;
}
</style>