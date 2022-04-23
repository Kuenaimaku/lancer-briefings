<template>
  <div class="pilot-modal">
    <div class="pilot-header-container">
      <div class="section-header clipped-medium-backward-bio">
        <img src="/icons/pilot-icon.svg" />
        <h1>{{ pilot.name }} [{{ pilot.callsign }}]</h1>
      </div>
      <div class="rhombus-back">&nbsp;</div>
    </div>
    <div class="pilot">
      <Markdown :source="pilot.history" class="markdown" html="true"/>
    </div>
  </div>
  <div class="pilot-modal portrait">
    <div class="pilot-header-container">
      <div class="section-header clipped-medium-backward-pilot">
        <img src="/icons/portrait-icon.svg" />
        <h1>Pilot Artwork</h1>
      </div>
      <div class="rhombus-back">&nbsp;</div>
    </div>
    <div class="pilot">
      <img :src="portrait" class="portrait" />
    </div>
  </div>
</template>

<script>
import Markdown from "vue3-markdown-it";

export default {
  components: {
    Markdown,
  },
  data() {
    return {
      bio: "",
    };
  },
  props: {
    pilot: {
      type: Object,
      required: true,
    },
  },
  computed: {
    portrait() {
      return this.pilot.cloud_portrait;
    },
  },
  methods: {},
};
</script>
