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

@import url('https://fonts.googleapis.com/css2?family=Big+Shoulders+Display:wght@400;600;800&display=swap');

#app {
  width: 1902px;
  height: 910px;
  overflow: hidden;
  background-image: url("./assets/background.png");
  background-size: cover;
}

header {
  background-color: rgba(23, 29, 30, 0.8);
  border-color: rgba(23, 29, 30, 0.8);
  height:96px;
  display:flex;
  align-items: center;
}

.title{
  background-color:#7DBBBB;
  border-color: #7DBBBB;
  width: 700px;
  height:100%;
  display:inline-block;
}

.rhombus{
  transform: skew(-0.785398rad) !important;
  background-color:#7DBBBB;
  border-color: #7DBBBB;
  width: 100px;
  height:100%;
  display:inline-block;
  margin-left:-40px;
}

.rhombus-back{
  transform: skew(0.785398rad) !important;
  background-color:#7DBBBB;
  border-color: #7DBBBB;
  width: 40px;
  height:52px;
  display:inline-block;
  position: relative;
  left: -25px;
  top: -30px;
}

header video{
  margin-left:10%;
}

div .location-info{
  height:100px;
  width:500px;
  background-color:#7DBBBB;
  margin-left:20px;
}

div .content-container{
  display:flex;
  flex-direction: row;
}

section.section-container{
  display:flex;
  flex-direction: column;
  margin: 50px;
}

section .section-header {
    background-color:#7DBBBB;
    border-color: #7DBBBB;
    height:52px;
    display:inline-flex;
    gap:15px;
    padding-left:16px;

    img{
      width:36px;
      height:36px;
      background-color:#FF0;
      align-self: center;
    }

    h1{
      font-size: 26px;
      margin:0%;
      align-self: center;
      font-family: 'Big Shoulders Display', cursive;
      font-weight: 800;
      text-transform: uppercase;
      letter-spacing: 5px;
      }
  }

div.section-content-container{
  border: 1px solid #7DBBBB;
  border-top:0px;
  background: #171D1E;
}

.clipped-medium-backward{
  -webkit-clip-path: polygon(0 0, calc(100% - 52px) 0, 100% 100%, 0% 100%);
}

.clipped-medium-backward-pilot{
  width:452px;
  -webkit-clip-path: polygon(0 0, 400px 0, 452px 100%, 0% 100%);
}

.clipped-x-large-forward{
  clip-path: polygon(100% 0, 100% calc(100% - 96px), calc(100% - 96px) 100%, 0 100%, 0 0);
  -webkit-clip-path: polygon(100% 0, 100% calc(100% - 96px), calc(100% - 96px) 100%, 0 100%, 0 0);
}
</style>
