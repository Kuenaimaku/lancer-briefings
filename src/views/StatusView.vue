<template>
	<div class="content-container">
    <section class="section-container" id="missions">
      <div class="section-header clipped-medium-backward">
        <img src="/icons/mission-icon.svg" />
        <h1>Mission Log</h1>
      </div>
      <div class="section-content-container">
        <h3>Current Assignment</h3>
        <Markdown :source="current_md" class="markdown" />
        <h3>Mission List</h3>
        <div class="mission-list-container">
          <Mission
            v-for="item in this.missions"
            :key="item.slug"
            :mission="item"
            :selected="this.mission_slug"
            @click="selectMission(item)"
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
        <Markdown :source="events" class="markdown" />
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
import Clock from '@/components/Clock.vue'

export default {
	components: {
		Markdown,
    Mission,
    Clock
	},
	data (){
		return {
			"mission_slug": "001",
      "current_md": "",
      "events": "",
      "missions": [
        {
          "slug": "001",
          "name": "Bug-Hunt",
          "status": "start"
        },
      ],
      "eventlog": [
        {
          "lt" : "MSMC TRANSPORT CARRIER // 2.21.5014U",
          "title": "I Would Have Been Your Daddy...",
          "image": "",
          "caption": "",
          "blurb": "this is a short sentence..."
        }
      ],
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
      }
		}
	},

	created() {
    this.loadMissionMarkdown()
    this.loadEventsMarkdown()
  },

  methods: {
    selectMission(mission) {
      this.$emit('missionSelected', mission)
		},
    loadMissionMarkdown() {
      let self = this;
      let md = `/missions/${self.mission_slug}.md`
      var client = new XMLHttpRequest();
      client.open('GET', md);
      client.onreadystatechange = function () {
        self.current_md = client.responseText;
      }
      client.send();
    },
    loadEventsMarkdown() {
      let self = this;
      let md = "";

      if (self.options.eventsMarkdownPerMission) {
        md = `/events/${self.mission_slug}.md`
      }
      else {
        md = "/events.md"
      }

      var client = new XMLHttpRequest();
      client.open('GET', md);
      client.onreadystatechange = function () {
        self.events = client.responseText;
      }
      client.send();
    },
    selectMainPanel(panel) {
      this.options.mainPanel = panel;
    }
  }
}
</script>