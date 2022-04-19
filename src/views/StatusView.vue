<template>
	<div class="content-container">
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
            :selected="this.missionSlug"
            @click="selectMission(item.slug)"
          />
        </div>
      </div>
    </section>
    <section class="section-container" id="events">
      <div class="section-header clipped-medium-backward">
        <img src="/icons/events-icon.svg" />
        <h1>Events Log</h1>
      </div>
      <div class="section-content-container">
        <div class="events-list-container">
          <Event
            v-for="item in this.events"
            :key="item.title"
            :event="item"
          />
        </div>
      </div>
    </section>
    <section class="section-container" id="reserves">
      <div class="section-header clipped-medium-backward">
        <img src="/icons/events-icon.svg" />
        <h1>Reserves</h1>
      </div>
      <div class="section-content-container">
        
      </div>
    </section>
    <section class="section-container" id="clocks">
      <div class="section-header clipped-medium-backward">
        <img src="/icons/events-icon.svg" />
        <h1>Progress Clocks</h1>
      </div>
      <div class="section-content-container">
        <div class="clocks-list-container">
          <Clock v-for="item in this.clocks" :key="item.name" :clock="item" />
        </div>
      </div>
    </section>
  </div>
</template>

<script>

import Markdown from 'vue3-markdown-it';
import Mission from '@/components/Mission.vue'
import Event from '@/components/Event.vue'
import Clock from '@/components/Clock.vue'

import removeMd from 'remove-markdown';

export default {
	components: {
		Markdown,
    Mission,
    Event,
    Clock
	},
	data (){
		return {
			"missionSlug": "001",
      "missionMarkdown": "",
      "events": [],
      "missions": [],
      "clocks": [
        {
          "type": "Story",
          "result": "Positive",
          "name": "Evergreen Defense",
          "description": "[Insert info here] Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed aliquam sem mi, vitae pharetra lorem dictum consectetur.",
          "color": "#7DBBBB",
          "value": 2,
          "max": 6,
        },
        {
          "type": "Story",
          "result": "Negative",
          "name": "Machine Horde",
          "description": "[Insert info here] Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed aliquam sem mi, vitae pharetra lorem dictum consectetur.",
          "color": "#FD7777",
          "value": 2,
          "max": 6,
        },
        {
          "type": "Pilot",
          "result": "Positive",
          "name" : "Digging Up the Past",
          "description": "This is a description of a Player Project clock.",
          "color": "#3CB043",
          "value": 2,
          "max": 3,
        }
      ],
      "options": {
        "eventsMarkdownPerMission": true,
      },
      removeMd,
		}
	},
  mounted() {
    this.importMissions(import.meta.glob('@/assets/missions/*.md', { as: 'raw' }));
    this.importEvents(import.meta.glob('@/assets/events/*.md', { as: 'raw' }));
    this.selectMission(this.missionSlug)
  },
  methods: {
    selectMission(mission) {
      this.missionSlug = mission;
      var m = this.missions.find(x => x.slug === mission);
      this.missionMarkdown = m.content;
		},
    importMissions(files) {
      for (const path in files) {
        let mission = {};
        const content = files[path];
        mission['slug'] = content.split('\r\n')[0];
        mission['name'] = content.split('\r\n')[1];
        mission['status'] = content.split('\r\n')[2];
        mission['content'] = content.split('\r\n').splice(3).join('\n');
        this.missions.push(mission);
      }
    },
    importEvents(files) {
      for (const path in files) {
        let event = {};
        const content = files[path];
        event['title'] = content.split('\r\n')[0];
        event['location'] = content.split('\r\n')[1];
        event['time'] = content.split('\r\n')[2];
        event['thumbnail'] = content.split('\r\n')[3];
        event['content'] = content.split('\r\n').splice(4).join('\n');
        this.events.push(event);
      }
    },
  }
}
</script>