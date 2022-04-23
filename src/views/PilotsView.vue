<template>
  <section class="section-container" id="pilots">
    <div style="height: 52px; overflow: hidden">
      <div class="section-header clipped-medium-backward-pilot">
        <img src="/icons/pilot-icon.svg" />
        <h1>Pilot Roster</h1>
      </div>
      <div class="rhombus-back">&nbsp;</div>
    </div>
    <div class="section-content-container">
      <div class="pilot-list-container">
        <Pilot v-for="item in this.pilots" :key="item.callsign" :pilot="item" />
      </div>
    </div>
  </section>
</template>

<script>
import Markdown from "vue3-markdown-it";
import Pilot from "@/components/Pilot.vue"

export default {
  components: {
    Markdown,
    Pilot
  },
  props: {
    pilots: {
      Type: Array,
      Required: true
    }
  },
  data() {
    return {
    }
  }
}
</script>
