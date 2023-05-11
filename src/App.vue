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
      "mission_slug": "006",
      "current_md": "",
      "events": "",
      "missions": [
      {
          "slug": "006",
          "name": "Sic Semper",
          "status": "start"
        },
        {
          "slug": "005",
          "name": "Grassroots",
          "status": "success"
        },
        {
          "slug": "004",
          "name": "Burn Down the House",
          "status": "partial-success"
        },
        {
          "slug": "003",
          "name": "Pulling Threads",
          "status": "success"
        },
        {
          "slug": "002",
          "name": "Steelworks",
          "status": "success"
        },
        {
          "slug": "001",
          "name": "The Long Night",
          "status": "success"
        },
      ],
      "pilots": [
        {
          "callsign": "BOB",
          "alias": "Brie O'Brien",
          "code": "b91cbe56-1948-9680-0901d615cf35118d//NDL-C-DEEP-STATION",
          "corpro": "IPS-N",
          "frame": "VLAD",
          "mech": "Spikey Boi"
        },
        {
          "callsign": "Cowboy",
          "alias": "Andy Altman",
          "code": "000fc99e-a855-4720-c6aae10011771b7a//NDL-C-DEEP-STATION",
          "corpro": "IPS-N",
          "frame": "Raleigh",
          "mech": "Onyx 2.0"
        },
        {
          "callsign": "Jayhawk",
          "alias": "Cvetanka Solverson",
          "code": "dee3549a-3f1c-9981-0396c277463b75dd//NDL-C-MECCOV-PROPER",
          "corpro": "SSC",
          "frame": "Mourning Cloak",
          "mech": "99 Problems"
        },
        {
          "callsign": "Righteous",
          "alias": "Tristan Karkov",
          "code": "def185ee-5b59-f3ed-ef659ca5caded34a//NDL-C-UNKNOWN",
          "corpro": "Horus",
          "frame": "Goblin",
          "mech": "Gremlin"
        },
        {
          "callsign": "Rusty Shell",
          "alias": 'Damir "Petrov" Radonić',
          "code": "23a5b917-186f-5fe9-1fe5f8dd10f772d0//NDL-C-MECCOV-PROPER",
          "corpro": "IPS-N",
          "frame": "Tortuga",
          "mech": "Uranium Core"
        },
        {
          "callsign": "Spider",
          "alias": 'Viktor Murakami',
          "code": "95974952-fbf5-a982-14f520982199a1ef//NDL-C-MECCOV-PROPER",
          "corpro": "SSC",
          "frame": "Swallowtail",
          "mech": "Recluse"
        },
        {
          "callsign": "Sterling",
          "alias": 'Archer Aster Silver',
          "code": "f9aaf53b-a22d-287f-39a5d7fff1976c7d//NDL-C-MECCOV-PROPER",
          "corpro": "SSC",
          "frame": "Monarch",
          "mech": "Woodhouse"
        },
      ],
      "header": {
        "planet": "Meccov::Srada",
        "year": "50XXu",
        "system": "Gemini Basin",
        "gate": "xxx",
        "ring": "Alterna-Line",
        "headerTitle": "JMR Agency",
        "headerSubtitle": "Intelligence Services",
        "subheaderTitle": "Intelligence",
        "subheaderSubtitle": "Security",
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
