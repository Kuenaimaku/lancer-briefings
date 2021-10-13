<template>
	<section class="section-container" id="missions">
      <div class="section-header clipped-medium-backward">
        <img src="/icons/mission-icon.svg" />
        <h1>Mission Log</h1>
      </div>
      <div class="section-content-container">
        <h3>Current Assignment</h3>
        <Markdown :source="missionMarkdown" class="markdown" />
        <h3>Mission List</h3>
        <div class="mission-list-container">
          <Mission
            v-for="item in this.missions"
            :key="item.slug"
            :mission="item"
            :selected="this.selected"
            @click="selectMission(item)"
          />
        </div>
      </div>
    </section>
</template>

<script>

import Mission from '@/components/Mission.vue';
import Markdown from 'vue3-markdown-it';

export default {
	components: {
		Mission,
		Markdown
	},
	props: {
		missions: {
			type: Array,
			required: true,
		},
		missionMarkdown: {
			type: String,
			required: true,
		},
		selected: {
			type: String,
			required: true,
		}
	},
	methods:{
		selectMission(mission) {
      this.$emit('missionSelected', mission)
		} 
	}
}
</script>