<template>
  <Header :header="this.header" />
  <Sidebar />
  <div id="router-view-container">
    <router-view :missions="missions" :events="events" :pilots="pilots" :clocks="clocks" :reserves="reserves" />
  </div>
  <svg style="visibility: hidden; position: absolute" width="0" height="0" xmlns="http://www.w3.org/2000/svg"
    version="1.1">
    <defs>
      <filter id="round">
        <feGaussianBlur in="SourceGraphic" stdDeviation="5" result="blur" />
        <feColorMatrix in="blur" mode="matrix" values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 19 -5" result="goo" />
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
import Header from "./components/layout/Header.vue";
import Sidebar from "./components/layout/Sidebar.vue";
import Footer from "./components/layout/Footer.vue";

export default {
  components: {
    Header,
    Footer,
    Sidebar,
  },

  data() {
    return {
      header: {
        planet: "Hercynia",
        year: "5014u",
        system: "Ardennes-3",
        gate: "Atlas-Quanokrim",
        ring: "Atlas-Line",
        headerTitle: "Mirrorsmoke",
        headerSubtitle: "Mercenary Company",
        subheaderTitle: "Crisis Response",
        subheaderSubtitle: "Delta-Echo-Echo-Zulu",
      },
      clocks: [],
      events: [],
      missions: [],
      pilots: [],
      reserves: [],
      init: {
        "APOLLO": {
          "age": "32u",
          "pob": "Evergreen",
        },
        "RAI-DEN": {
          "age": "48u",
          "pob": "Gaia"
        }
      }
    };
  },
  created() { },
  mounted() {
    this.importMissions(import.meta.glob("@/assets/missions/*.md", { as: "raw" }));
    this.importEvents(import.meta.glob("@/assets/events/*.md", { as: "raw" }));
    this.importClocks(import.meta.glob("@/assets/clocks/*.json"));
    this.importReserves(import.meta.glob("@/assets/reserves/*.json"));
    this.importPilots(import.meta.glob("@/assets/pilots/*.json"));
    this.$router.push("/status");
  },
  methods: {
    importMissions(files) {
      for (const path in files) {
        let mission = {};
        const content = files[path];
        mission["slug"] = content.split("\n")[0];
        mission["name"] = content.split("\n")[1];
        mission["status"] = content.split("\n")[2];
        mission["content"] = content.split("\n").splice(3).join("\n");
        this.missions.push(mission);
      }
    },
    importEvents(files) {
      for (const path in files) {
        let event = {};
        const content = files[path];
        event["title"] = content.split("\n")[0];
        event["location"] = content.split("\n")[1];
        event["time"] = content.split("\n")[2];
        event["thumbnail"] = content.split("\n")[3];
        event["content"] = content.split("\n").splice(4).join("\n");
        this.events.push(event);
      }
    },
    importClocks(files) {
      for (const path in files) {
        files[path]().then((mod) => {
          this.clocks = JSON.parse(JSON.stringify(mod)).default;
        });
      }
    },
    importReserves(files) {
      for (const path in files) {
        files[path]().then((mod) => {
          this.reserves = JSON.parse(JSON.stringify(mod)).default;
        });
      }
    },
    importPilots(files) {
      for (const path in files) {
        files[path]().then((mod) => {
          var pilotFromJson = JSON.parse(JSON.stringify(mod));
          var pilotFromVue = this.init[pilotFromJson.callsign.toUpperCase()];
          var pilot = {
            ...pilotFromJson,
            ...pilotFromVue
          }
          this.pilots.push(pilot);
          
          pilot.clocks.forEach((clock) => {
            this.clocks.push({
              type: `Pilot Project // ${pilot.callsign}`,
              result: "",
              name: clock.title,
              description: clock.description,
              value: clock.progress,
              max: clock.segments,
              color: "#3CB043"
            })
          })

          pilot.reserves.forEach((reserve) => {
            this.reserves.push({
              type: reserve.type,
              name: reserve.name,
              description: reserve.description,
              label: reserve.label,
              cost: reserve.cost,
              notes: reserve.notes,
              callsign: pilot.callsign.toUpperCase()
            })
          })
        });
      }
    },
  }
};
</script>

<style>
#app {
  width: 1901px;
  height: 924px;
  overflow: hidden !important;
  border-right: 1px solid #ff0;
  border-bottom: 1px solid #ff0;
}
</style>
