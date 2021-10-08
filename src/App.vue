<template>
  <Header/>
  <div class="content-container">
    <section class="section-container" style="width:435px; height:714px;">
      <div class="section-header clipped-medium-backward">
        <img/>
        <h1>Mission Log</h1>
      </div>
      <div class="section-content-container">
        <h3>Current Assignment</h3>
      </div>
    </section>
    <section class="section-container" style="width:435px; height:714px;">
      <div class="section-header clipped-medium-backward">
        <img/>
        <h1>Events Log</h1>
      </div>
      <div class="section-content-container">
        <h3>Current Assignment</h3>
      </div>
    </section>
    <section class="section-container" style="width:894px; height:714px;">
      <div style="height:52px; overflow:hidden;">
        <div class="section-header clipped-medium-backward-pilot">
          <img/>
          <h1>Pilot Roster</h1>
        </div>
        <div class="rhombus-back">&nbsp;</div>
      </div>
      <div class="section-content-container">

      </div>
    </section>
  </div>
</template>

<script>
import Header from './components/layout/Header.vue'

export default {
  components: {
    Header
  },
  
  data() {
    return {
    }
  }
}
</script>


<style lang="scss">

#app {
  width: 1902px;
  height: 910px;
  overflow: hidden;
  background-image: url("@/background.png");
  background-size: cover;
}

</style>
