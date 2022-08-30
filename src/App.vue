<template>
  <div class="page-wrapper">
    <Header
      :planetPath="planetPath"
      :class="{animate: animate}"
      :header="this.header" />
    <Sidebar :class="{animate: animate}" />
  </div>
	<div id="router-view-container">
		<RouterView
      :animate="animate"
      :initialSlug="initialSlug"
			:missions="missions"
			:events="events"
			:pilots="pilots"
			:clocks="clocks"
			:reserves="reserves"
		/>
	</div>
	<svg
		style="visibility: hidden; position: absolute"
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
</template>

<script>
import Header from "./components/layout/Header.vue";
import Sidebar from "./components/layout/Sidebar.vue";
import Info from "@/assets/info/general-info.json"

export default {
	components: {
		Header,
		Sidebar,
	},

	data() {
		return {
      initialSlug: Info.initialSlug,
      planetPath: Info.planetPath,
			header: Info.header,
			clocks: [],
			events: [],
			missions: [],
			pilots: [],
			reserves: [],
			init: {
				APOLLO: {
					age: "32u",
					pob: "Evergreen",
				},
				"RAI-DEN": {
					age: "48u",
					pob: "Gaia",
				},
			},
      animate: true,
		};
	},
	created() {
    this.importMissions(import.meta.glob("@/assets/missions/*.md", { as: 'raw' }));
		this.importEvents(import.meta.glob("@/assets/events/*.md", { as: 'raw' }));
		this.importClocks(import.meta.glob("@/assets/clocks/*.json"));
		this.importReserves(import.meta.glob("@/assets/reserves/*.json"));
		this.importPilots(import.meta.glob("@/assets/pilots/*.json"));
    // this.disableAnimate();
  },
	mounted() {
		this.$router.push("/status");
	},
	methods: {
		async importMissions(files) {
      let filePromises = Object.keys(files).map(path => files[path]());
      let fileContents = await Promise.all(filePromises);
			fileContents.forEach(content => {
        let mission = {};
        mission["slug"] = content.split("\n")[0];
        mission["name"] = content.split("\n")[1];
        mission["status"] = content.split("\n")[2];
        mission["content"] = content.split("\n").splice(3).join("\n");
        this.missions = [...this.missions, mission];
        });
		},
		async importEvents(files) {
      let filePromises = Object.keys(files).map(path => files[path]());
      let fileContents = await Promise.all(filePromises);
			fileContents.forEach(content => {
				  let event = {};
          event["title"] = content.split("\n")[0];
          event["location"] = content.split("\n")[1];
          event["time"] = content.split("\n")[2];
          event["thumbnail"] = content.split("\n")[3];
          event["content"] = content.split("\n").splice(4).join("\n");
          this.events = [...this.events, event];
        })
		},
		async importClocks(files) {
			let filePromises = Object.keys(files).map(path => files[path]());
      let fileContents = await Promise.all(filePromises);
			fileContents.forEach(content => {
					this.clocks = JSON.parse(JSON.stringify(content)).default;
				});
		},
		async importReserves(files) {
			let filePromises = Object.keys(files).map(path => files[path]());
      let fileContents = await Promise.all(filePromises);
			fileContents.forEach(content => {
					this.reserves = JSON.parse(JSON.stringify(content)).default;
				});
		},
		async importPilots(files) {
			let filePromises = Object.keys(files).map(path => files[path]());
      let fileContents = await Promise.all(filePromises);
			fileContents.forEach(content => {
					var pilotFromJson = JSON.parse(JSON.stringify(content));
					var pilotFromVue = this.init[pilotFromJson.callsign.toUpperCase()];
					var pilot = {
						...pilotFromJson,
						...pilotFromVue,
					};
					this.pilots.push(pilot);
					pilot.clocks.forEach(content => {
            let clock = {};
            clock["type"] = `Pilot Project // ${pilot.callsign}`;
            clock["result"] = "";
            clock["name"] = content.title;
            clock["description"] = content.description;
            clock["value"] = content.progress;
            clock["max"] = content.segments;
            clock["color"] = "#3CB043";
            this.clocks = [...this.clocks, clock];
					});

					pilot.reserves.forEach(content => {
            let reserve = {};
            reserve["type"] = content.type;
            reserve["name"] = content.name;
            reserve["description"] = content.description;
            reserve["label"] = content.label;
            reserve["cost"] = content.cost;
            reserve["notes"] = content.notes;
            reserve["callsign"] = pilot.callsign.toUpperCase();
            this.reserves = [...this.reserves, reserve];
					});
				});
		},
    // disableAnimate() {
    //   // TODO: Make this method take in a string for the "getItem" name so that each view will have its own global
    //   //      "was<name>Animated" setting. Pass this.$options.name to get Component name.
    //   //      This method should also take in the component-specific variable to set.
    //   let frameAnimated = window.sessionStorage.getItem('frameAnimated');
    //   if (frameAnimated) {
    //     this.animate = false;
    //   }
    //   if (frameAnimated === null) {
    //     window.sessionStorage.setItem('frameAnimated', true);
    //   }
    // },
	},
};
</script>

<style>
#app {
	width: 1901px;
	/* height: 100%; */
  min-height: 100vh;
	overflow: hidden !important;
	/* border-right: 1px solid #ff0;
	border-bottom: 1px solid #ff0; */
}
</style>
