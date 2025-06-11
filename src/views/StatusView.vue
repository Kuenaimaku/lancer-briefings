<template>
	<div id="status" :class="{ animate: animateView }" :style="{ 'animation-delay': animationDelay }"
		class="content-container">
		<section id="missions" class="section-container" :style="{ 'animation-delay': animationDelay }">
			<div class="section-header clipped-medium-backward">
				<img src="/icons/campaign.svg" />
				<h1>Mission Log</h1>
			</div>
			<div class="section-content-container">
				<div class="mission-list-container">
					<Mission v-for="item in missions" :key="item.slug" :mission="item" :selected="missionSlug"
						@click="selectMission(item.slug)" />
				</div>
			</div>
		</section>
		<section id="assignment" class="section-container" :style="{ 'animation-delay': animationDelay }">
			<div class="section-header clipped-medium-backward">
				<img src="/icons/deployable.svg" />
				<h1>Current Assignment</h1>
			</div>
			<div class="section-content-container">
				<vue-markdown-it :source="missionMarkdown" class="markdown" />
			</div>
		</section>
		<div>
		<section id="reserves" class="section-container" :style="{ 'animation-delay': animationDelay }">
			<div class="section-header clipped-medium-backward">
				<img src="/icons/squad.svg" />
				<h1>Reserves</h1>
			</div>
			<div class="section-content-container">
				<div class="reserves-list-container">
					<Reserve v-for="item in reserves" :key="item.name" :reserve="item" :pilots="pilots" />
				</div>
			</div>
		</section>
		<section id="clocks" class="section-container" :style="{ 'animation-delay': animationDelay }">
			<div class="section-header clipped-medium-backward">
				<img src="/icons/protocol.svg" />
				<h1>Clocks</h1>
			</div>
			<div class="section-content-container">
				<div class="clocks-list-container">
					<Clock v-for="item in clocks" :key="item.name" :clock="item" :animate="animate"
						:animation-delay="clockAnimationDelay" />
				</div>
			</div>
		</section>
	</div>
	</div>
</template>

<script>
import { VueMarkdownIt } from '@f3ve/vue-markdown-it';
import Mission from "@/components/Mission.vue";
import Event from "@/components/Event.vue";
import Clock from "@/components/Clock.vue";
import Reserve from "@/components/Reserve.vue";

export default {
	components: {
		VueMarkdownIt,
		Mission,
		Event,
		Clock,
		Reserve,
	},
	props: {
		animate: {
			type: Boolean,
			required: true,
		},
		initialSlug: {
			type: String,
			required: true,
		},
		missions: {
			type: Array,
			required: true,
		},
		events: {
			type: Array,
			required: true,
		},
		pilots: {
			type: Array,
			required: true,
		},
		clocks: {
			type: Array,
			required: true,
		},
		reserves: {
			type: Array,
			required: true,
		},
	},
	data() {
		return {
			missionSlug: this.initialSlug,
			animateView: this.animate,
			animationDelay: "1.75s",
			clockAnimationDelay: "2500",
			missionMarkdown: "",
		};
	},
	computed: {},
	created() {
		this.setAnimate();
		this.setClockAnimateDelay();
	},
	beforeUpdate() {
		// initial set
		this.selectMission(this.missionSlug);
	},
	mounted() {
		// need to set on re-mount
		if (this.missions.length > 0) {
			this.selectMission(this.missions[0].slug);
		}
	},
	methods: {
		selectMission(slug) {
			this.missionSlug = slug;
			let m = this.missions.find(x => x.slug === this.missionSlug);
			this.missionMarkdown = m.content;
		},
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
		},
		setClockAnimateDelay() {
			let delayToFloat = parseFloat(this.animationDelay.replace("s", ""));
			let finalClockDelay = delayToFloat * 600 + 600;
			this.clockAnimationDelay = finalClockDelay.toString();
		},
	},
};
</script>
