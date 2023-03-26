<template>
  <Header :header="this.header" />
  <div class="content-container">
    <section class="section-container" id="missions" style="width:435px; height:714px;">
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
    <section class="section-container" id="events" style="width:435px; height:714px;">
      <div class="section-header clipped-medium-backward">
        <img src="/icons/events-icon.svg" />
        <h1>Events Log</h1>
      </div>
      <div class="section-content-container">
        <Markdown :source="events" class="markdown" />
      </div>
    </section>
    <section class="section-container" id="pilots" style="width:894px; height:714px;">
      <div style="height:52px; overflow:hidden;">
        <div class="section-header clipped-medium-backward-pilot">
          <img src="/icons/pilot-icon.svg" />
          <h1>Pilot Roster</h1>
        </div>
        <div class="rhombus-back">&nbsp;</div>
      </div>
      <div class="section-content-container">
        <div class="pilot-list-container">
          <Pilot v-for="item in this.pilots" :key="item.slug" :pilot="item" />
        </div>
      </div>
    </section>
  </div>
  <svg
    style="visibility: hidden; position: absolute;"
    width="0"
    height="0"
    xmlns="http://www.w3.org/2000/svg"
    version="1.1"
  >
    <defs>
      <filter id="round">
        <feGaussianBlur in="SourceGraphic" stdDeviation="5" result="blur" />
        <feColorMatrix
          in="blur"
          mode="matrix"
          values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 19 -5"
          result="goo"
        />
        <feComposite in="SourceGraphic" in2="goo" operator="atop" />
      </filter>
    </defs>
  </svg>
  <audio autoplay>
    <source src="/startup.ogg" type="audio/ogg" />
  </audio>
  <Footer/>
</template>

<script>
import Header from './components/layout/Header.vue';
import Footer from './components/layout/Footer.vue';
import Mission from './components/Mission.vue';
import Pilot from './components/Pilot.vue';
import Markdown from 'vue3-markdown-it';

export default {
  components: {
    Header,
    Footer,
    Mission,
    Pilot,
    Markdown
  },

  data() {
    return {
      "mission_slug": "003",
      "current_md": "",
      "events": "",
      "missions": [
        {
          "slug": "003",
          "name": "Floodgate",
          "status": "start"
        },
        {
          "slug": "002",
          "name": "Vigilant Gaze",
          "status": "partial-success"
        },
        {
          "slug": "001",
          "name": "Bug-Hunt",
          "status": "success"
        },
      ],
      "pilots": [
        {
          "callsign": "Blaze",
          "alias": "Elijah Taw",
          "code": "Taw.Elijah:62420f55-4640-4fd0-acc4-0de5bc039e4d//NDL-C-SORROW-SKY",
          "corpro": "SSC",
          "frame": "Monarch",
          "mech": "Striking Sun"
        },
        {
          "callsign": "Bulwark",
          "alias": "Roland Ironguts",
          "code": "Ironguts.Roland:b5e39aa0-0e40-4b7c-8b35-1049a2aa6207//NDL-C-BETA-HIDE",
          "corpro": "IPS-N",
          "frame": "Drake",
          "mech": "Alexander"
        },
        {
          "callsign": "Rabbit",
          "alias": "Case Young",
          "code": "Young.Chase:8b55ba62-473f-4e7a-9dae-2010ac9bb2bb//NDL-C-FIRST-CRYPT",
          "corpro": "HORUS",
          "frame": "Goblin",
          "mech": "Jester Vulcan"
        },
        {
          "callsign": "Stinger",
          "alias": "Victor Steele",
          "code": "Steele.Victor:f80dee99-30af-4a3f-a65f-9590577f5847//NDL-C-DEEP-TEMPLE",
          "corpro": "IPS-N",
          "frame": "Raleigh",
          "mech": "One Shot Mk-II"
        },
      ],
      "header": {
        "planet": "Hercynia",
        "year": "5014u",
        "system": "Ardennes-3",
        "gate": "Atlas-Quanokrim",
        "ring": "Atlas-Line",
        "headerTitle": "Union",
        "headerSubtitle": "Auxiliaries",
        "subheaderTitle": "First Response Team",
        "subheaderSubtitle": "Burning Sky",
      },
      "options":{
        "eventsMarkdownPerMission": true
      }
    }
  },

  created() {
    this.loadMissionMarkdown()
    this.loadEventsMarkdown()
  },

  computed: {

  },

  methods: {
    selectMission(mission) {
      this.mission_slug = mission.slug;
      this.loadMissionMarkdown()
      if(this.options.eventsMarkdownPerMission){
        this.loadEventsMarkdown();
      }
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

      if(self.options.eventsMarkdownPerMission){
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
    }
  }

}
</script>


<style lang="scss">
#app {
  width: 1902px;
  height: 910px;
  overflow: hidden;
}
</style>
