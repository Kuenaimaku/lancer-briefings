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
          <Event v-for="item in this.events" :key="item.title" :event="item" />
        </div>
      </div>
    </section>
    <section class="section-container" id="reserves">
      <div class="section-header clipped-medium-backward">
        <img src="/icons/events-icon.svg" />
        <h1>Reserves</h1>
      </div>
      <div class="section-content-container">
        <div class="reserves-list-container">
          <Reserve v-for="item in this.reserves" :key="item.name" :reserve="item" :pilots="pilots"/>
        </div>
      </div>
    </section>
    <section class="section-container" id="clocks">
      <div class="section-header clipped-medium-backward">
        <img src="/icons/events-icon.svg" />
        <h1>Progress Clocks</h1>
      </div>
      <div class="section-content-container">
        <div class="clocks-list-container">
          <Clock v-for="item in this.clocks" :key="item.name" :clock="item"/>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import Markdown from "vue3-markdown-it";
import Mission from "@/components/Mission.vue";
import Event from "@/components/Event.vue";
import Clock from "@/components/Clock.vue";
import Reserve from "@/components/Reserve.vue";

export default {
  components: {
    Markdown,
    Mission,
    Event,
    Clock,
    Reserve
  },
  props: {
    missions: {
      Type: Array,
      Required: true
    },
    events: {
      Type: Array,
      Required: true
    },
    pilots: {
      Type: Array,
      Required: true
    },
    clocks: {
      Type: Array,
      Required: true,
    },
    reserves: {
      Type: Array,
      Required: true,
    }
  },
  data() {
    return {
      missionSlug: "001",
      missionMarkdown: ""
    };
  },
  computed: {
  },
  mounted() {
    this.selectMission(this.missionSlug);
  },
  methods: {
    selectMission(mission) {
      this.missionSlug = mission;
      var m = this.missions.find((x) => x.slug === mission);
      this.missionMarkdown = m.content;
    },
  },
};
</script>
