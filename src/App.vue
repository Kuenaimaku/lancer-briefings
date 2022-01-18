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
      "pilots": [
        {
          "callsign": "Spectre",
          "alias": "Adam Geist",
          "code": "a485b10d-760b-44e2-8bce-643fe941c803//d5761423-3978-4e8d-8167-bfc72ffe80e3//NDL-C-DEEP-STATION",
          "corpro": "GMS",
          "frame": "Everest",
          "mech": "Efficacious Grace"
        },
        {
          "callsign": "Sunrise",
          "alias": "Ren Shou Tomesch Lewton",
          "code": "0f406ce1-c66d-439f-9e62-9031e2d33ed8//b36398ba-f73f-4bcb-a6ca-48588f993577//NDL-C-DEEP-STATION",
          "corpro": "GMS",
          "frame": "Everest",
          "mech": "A Profound Problem"
        },
        {
          "callsign": "Goose",
          "alias": "Nick Bradshaw",
          "code": "9dfab210-672d-4611-9191-1f0b597b15a1//d441fb56-2266-4051-9072-476c42690f56//NDL-C-DEEP-STATION",
          "corpro": "GMS",
          "frame": "Sagarmatha",
          "mech": "Space Cowboy"
        },
        {
          "callsign": "Pharaoh",
          "alias": 'Clarissa "Rissa" Pentecost',
          "code": "ffe8fc8f-c855-48ae-a91c-725941a23073// 1c89218f-e841-490b-9524-462b77f79728//NDL-C-DEEP-STATION",
          "corpro": "GMS",
          "frame": "Sagarmatha",
          "mech": "Sarcophagus"
        },
        {
          "callsign": "Strange Cargo",
          "alias": "Johannus Mammen-Dovenbarger",
          "code": "e3c300f1-ab1b-4995-a396-07b0ed30fc2c//f0dddd96-7c89-4ff1-8712-a00fcc3be962//NDL-C-DEEP-STATION",
          "corpro": "GMS",
          "frame": "Sagarmatha",
          "mech": "OVER-SEASONED AND UNDER-COOKED"
        },
        {
          "callsign": "Sandman",
          "alias": "Jimothy Salads",
          "code": "bd6f2e77-2eea-48c2-ab77-d0e70efed06f// 718275c4-a2f9-47c4-959f-b1d8cd2a196//NDL- C-DEEP-STATION",
          "corpro": "GMS",
          "frame": "Everest",
          "mech": "Not In My Backyard"
        },
      ],
      "header": {
        "planet": "Hercynia",
        "year": "5014u",
        "system": "Ardennes-3",
        "gate": "Quanokrim/1.523LY",
        "ring": "Atlas Line",
        "headerTitle": "Union",
        "headerSubtitle": "Naval Department",
        "subheaderTitle": "Auxiliary Program",
        "subheaderSubtitle": "Delta-Echo-Echo-Zulu",
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
