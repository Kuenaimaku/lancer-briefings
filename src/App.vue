<template>
  <Header :header="this.header" />
  <Sidebar/>
  <div id="router-view-container">
    <router-view/>
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
  <Footer />
</template>

<script>
import Header from './components/layout/Header.vue';
import Sidebar from './components/layout/Sidebar.vue';
import Footer from './components/layout/Footer.vue';

export default {
  components: {
    Header,
    Footer,
    Sidebar
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
          "callsign": "Jinzo",
          "alias": "Shayan Arsenal",
          "code": "462370be-bd0f-41c2-b667-cc75f3a59a96///NDL-C-DEEP-STATION//377308ad-ba23-410b-ae37-68a1fb5f8db4",
          "corpro": "GMS",
          "frame": "Everest",
          "mech": "Type - Worst Beat"
        },
        {
          "callsign": "Kal",
          "alias": "Vier Flau",
          "code": "7cd700cc-c990-48ed-892f-e5468de724c4///NDL-C-DEEP-STATION//a98c3e28-ad4a-4f89-bcd9-501464e960da",
          "corpro": "GMS",
          "frame": "Everest",
          "mech": "Necrophile"
        },
        {
          "callsign": "Starboard",
          "alias": "Maria",
          "code": "4be26ce9-923b-4069-b6c9-76437d4be455///NDL-C-DEEP-STATION//056940c6-8d55-4190-8e85-57caa043cb1a",
          "corpro": "GMS",
          "frame": "Everest",
          "mech": "Scarlet Judicator"
        },
        {
          "callsign": "Badlands",
          "alias": "Marlene Gatsby",
          "code": "98ca9616-044e-4f87-b89b-aae4eb3387ec///NDL-C-DEEP-STATION//6f572259-6946-41bf-931a-e0543709e892",
          "corpro": "GMS",
          "frame": "Everest",
          "mech": "Mayfly"
        },
        {
          "callsign": "Compadre",
          "alias": 'Clint "CC" Cruz',
          "code": "d1fdf62e-d81e-4e10-97c8-df3bc4860117///NDL-C-DEEP-STATION//5a4254aa-9fa2-42ca-a077-8f5bfd1e1ad3",
          "corpro": "GMS",
          "frame": "Everest",
          "mech": "Rio Bravo"
        },
      ],
      "npcs": [
        {
          "name": "Snakeman",
          "affiliation": "Mirrorsmoke Mercenary Company",
          "pronouns": "He/Him",
          "notes": "DELTA-ECHO-ECHO-ZULU's primary report"
        },
        {
          "name": "Brava Hadura",
          "affiliation": "Evergreen",
          "pronouns": "She/Her",
          "notes": "Captain of the Local Militia"
        },
      ],
      "header": {
        "planet": "Hercynia",
        "year": "5014u",
        "system": "Ardennes-3",
        "gate": "Atlas-Quanokrim",
        "ring": "Atlas-Line",
        "headerTitle": "Mirrorsmoke",
        "headerSubtitle": "Mercenary Company",
        "subheaderTitle": "Crisis Response",
        "subheaderSubtitle": "Delta-Echo-Echo-Zulu",
      },
      "clocks": [
        {
          "name": "Positive",
          "description": "This is a description of a positive clock.",
          "help": "Having more segments filled in will make things easier for you during later missions.",
          "color": "#7DBBBB",
          "value": 2,
          "max": 6,
        },
        {
          "name": "Negative",
          "description": "This is a description of a negative clock.",
          "help": "Having more segments filled in will make things harder for you during later missions.",
          "color": "#FD7777",
          "value": 2,
          "max": 3,
        },
        {
          "name": "Player Project",
          "description": "This is a description of a Player Project clock.",
          "help": "Filling all the segments will grant Player a new power.",
          "color": "#3CB043",
          "value": 0,
          "max": 5,
        }
      ],
      "options": {
        "eventsMarkdownPerMission": true,
        "mainPanel": "pilot",
        "panelOptions": [
          "pilot",
          "npc",
          "glossary",
          "clock"
        ]
      }
    }
  },

  created() {
  },

  mounted(){
    this.$router.push('/status')
  },
  methods: {
  }

}
</script>


<style>
#app {
  width: 1902px;
  height: 910px;
  overflow: hidden !important;
  border-right: 1px solid #FF0;
  border-bottom: 1px solid #FF0;
}
</style>
