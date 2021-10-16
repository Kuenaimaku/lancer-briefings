<template>
		<div class="clock">
			<h1>{{$props.clock.name}}</h1>
			<o-tooltip :label="$props.clock.help" position="bottom" size="large" multiline>
			<DoughnutChart :chartData="testData" class="chart"/>
			</o-tooltip>
			<p>{{$props.clock.description}}</p>
		</div>
</template>

<script lang="ts">
import { Chart, registerables } from 'chart.js';
Chart.register(...registerables);

Chart.defaults.plugins.tooltip.enabled = false;
Chart.defaults.plugins.legend.display = false;
Chart.defaults.animation = {delay: 100, duration: 1000, easing: 'easeInOutExpo', loop: false}

import { computed, defineComponent, ref } from 'vue';
import { DoughnutChart } from 'vue-chart-3';

export default defineComponent({
  name: 'Clock',
  components: { DoughnutChart },
	props:{
		clock: Object,
	},
  setup(props) {

		const dataArray = [];
		const colorArray =[];
		for (let index = 0; index < props.clock.max; index++) {
			dataArray.push(1);
			
			if(index < props.clock.value){
				colorArray.push(props.clock.color)
			}
			else{
				colorArray.push('#AAA')
			}
		}

    const data = ref(dataArray);
    const doughnutRef = ref();

    const options = ref({
      responsive: true,
    });

    const testData = computed(() => ({
      datasets: [
        {
          data: data.value,
          backgroundColor: colorArray
        },
      ],
    }));

    return { testData, doughnutRef, options };
  }
});
</script>

<style type="scss">


</style>