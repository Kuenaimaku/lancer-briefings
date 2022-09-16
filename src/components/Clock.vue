<template>
	<div class="clock-container" @click="toggleActive">
		<div
		  v-if="$props.clock.type == 'Story'"
		  :class="$props.clock.type.toLowerCase()">
			<div class="clock-header">
				<h2 class="clock-subtitle">{{ $props.clock.type }} // {{ $props.clock.result }}</h2>
				<h1 class="clock-title">{{ $props.clock.name }}</h1>
			</div>
			<div class="clock-body">
				<div class="clock">
					<DoughnutChart
					  :chartData="testData"
					  :options="options"
					  class="chart" />
				</div>
				<div class="clock-summary">
					{{ clock.description }}
				</div>
			</div>
		</div>
		<div
		  v-if="$props.clock.type != 'Story'"
		  :class="$props.clock.type.toLowerCase()">
			<div class="clock-body">
				<div class="clock">
					<DoughnutChart
					  :chartData="testData"
					  :options="options"
					  class="chart" />
				</div>
				<div class="clock-header">
					<h2 class="clock-subtitle">{{ $props.clock.type }}</h2>
					<h1 class="clock-title">{{ $props.clock.name }}</h1>
				</div>
				<o-icon
				  pack="mdi"
				  class="icon transition"
				  ref="arrow"
				  icon="chevron-up"
				  size="large"
				  v-bind:style="{ transform: `rotate(${$props.deg}deg)` }" />
			</div>
			<div
			  v-if="isActive"
			  class="clock-summary">
				{{ clock.description }}
			</div>
		</div>
	</div>
</template>

<script lang="ts">
import { Chart, registerables } from "chart.js";
Chart.register(...registerables);

Chart.defaults.plugins.tooltip.enabled = false;
Chart.defaults.plugins.legend.display = false;
Chart.defaults.animation = {
	delay: 100,
	duration: 1000,
	easing: "easeInOutExpo",
	loop: false,
};
Chart.defaults.plugins.filler;

import { computed, defineComponent, ref } from "vue";
import { DoughnutChart } from "vue-chart-3";

export default defineComponent({
	name: "Clock",
	components: { DoughnutChart },
	props: {
		clock: {
			type: Object,
			required: true,
		},
		animate: {
			type: Boolean,
			required: true,
		},
		animationDelay: {
			type: String,
			required: false,
		},
	},
	setup(props) {
		const dataArray: number[] = [];
		const colorArray: string[] = [];
		for (let index = 0; index < props.clock.max; index++) {
			dataArray.push(1);

			if (index < props.clock.value) {
				colorArray.push(props.clock.color);
			} else {
				colorArray.push("#AAA");
			}
		}
		const data = ref(dataArray);
		const animation = !props.animate ? null : { delay: parseInt(props.animationDelay) };
		const options = ref({
			responsive: true,
			cutout: "35%",
			devicePixelRatio: 2,
			animation,
		});

		const testData = computed(() => ({
			datasets: [
				{
					data: data.value,
					backgroundColor: colorArray,
				},
			],
		}));
		const deg = ref(0);
		const isActive = ref(false);

		function toggleActive() {
			if (this.deg > 0) {
				this.deg = 0;
			} else {
				this.deg = 180;
			}
			isActive.value = !isActive.value;
		}

		return { testData, options, isActive, toggleActive };
	},
});
</script>

<style type="scss">
.transition {
	transition: transform 0.1s ease-in-out;
}
</style>
