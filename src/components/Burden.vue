<template>
	<div class="burden-container">
		<div class="burden-body">
			<div class="burden">
				<DoughnutChart
				  :chartData="testData"
				  :options="options"
				  class="chart" />
			</div>
			<div class="burden-header">
				<h2 class="burden-subtitle">Burden</h2>
				<h1 class="burden-title">{{ $props.burden.title }}</h1>
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

import { computed, defineComponent, ref, reactive } from "vue";
import { DoughnutChart } from "vue-chart-3";

export default defineComponent({
	name: "Burden",
	components: { DoughnutChart },
	props: {
		burden: {
			type: Object,
			required: true,
		},
		animate: {
			type: Boolean,
			required: true,
		},
	},
	setup(props) {
		const dataArray: number[] = [];
		const colorArray: string[] = [];
		for (let index = 0; index < props.burden.segments; index++) {
			dataArray.push(1);

			if (index < props.burden.progress) {
				colorArray.push("#A00");
			} else {
				colorArray.push("#AAA");
			}
		}
		const data = ref(dataArray);
		const animation = !props.animate ? null : { delay: 1500 };
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

		const isActive = ref(false);

		function toggleActive() {
			isActive.value = !isActive.value;
		}

		return { testData, options, isActive, toggleActive };
	},
});
</script>

<style type="scss"></style>
