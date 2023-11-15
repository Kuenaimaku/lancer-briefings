<template>
  	<v-scale-screen width="1920" height="1080">
  <header class="clipped-x-large-forward">
    <div class="title clipped-x-large-forward">
      <img class="logo" src="/icons/ipsn-company-icon.svg" />
      <div class="title-container">
        <div class="title-row" id="title-first-line">
          <span id="title-header">{{ header.headerTitle }}</span>
          <span id="title-subheader">{{ header.headerSubtitle }}</span>
        </div>
        <div class="title-row">
          <span id="subtitle-header">{{ header.subheaderTitle }}</span>
          <span id="subtitle-subheader">// {{ header.subheaderSubtitle }}</span>
        </div>
      </div>
    </div>
    <div class="rhombus">&nbsp;</div>
    <video autoplay muted loop width="90px" height="90px">
      <source src="/Dagmars_Test_3.webm" type="video/webm" />
    </video>
    <div class="location-info">
      <div class="location-row" id="planet-year">
        <div id="planet">
          <h4>Deployment Info</h4>
          <span class="subtitle">{{ header.planet }}</span>
        </div>
        <div id="year">
          <h4>Year</h4>
          <span class="subtitle">{{ header.year }}</span>
        </div>
      </div>
      <div class="location-row" id="system-gate-ring">
        <div id="system">
          <h4>System</h4>
          <span class="subtitle">{{ header.system }}</span>
        </div>
        <div id="gate">
          <h4>Gate</h4>
          <span class="subtitle">{{ header.gate }}</span>
        </div>
        <div id="ring">
          <h4>Ring</h4>
          <span class="subtitle">{{ header.ring }}</span>
        </div>
      </div>
    </div>
  </header>
</v-scale-screen>
</template>

<script>


export default {
  components: {
  },
  props: {
    header: {
      type: Object,
      required: true,
    }
  }
}
</script>

<style lang="scss">
#app {
  width: 100vw;
  height: 100vh;
  overflow: auto; // Changed to auto to allow scrolling when content overflows
}

.content-container {
  display: flex;
  flex-direction: row;
  flex-wrap: wrap; // This allows items to wrap onto multiple lines
  justify-content: center;
  align-items: flex-start; // Aligns items to the start of the flex container
  padding: 10px;
}

.section-container {
  flex: 1;
  margin: 10px;
  box-sizing: border-box; // Includes padding and border in the element's total width and height
  min-width: 300px; // Minimum width before wrapping happens

  // You can still keep the media queries if you want specific styles at certain breakpoints
}

// Continue with other responsive design adjustments as necessary
</style>