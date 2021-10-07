<template>
	<header class="clipped-x-large-forward">
    <div class="title clipped-x-large-forward">&nbsp;</div>
    <div class="rhombus">&nbsp;</div>
    <video autoplay muted loop width="100px" height="100px">
      <source src="@/assets/planet.webm" type="video/webm">
    </video>
    <div class="location-info">
      test
    </div>
  </header>
</template>

<style lang="scss" scoped>

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

.clipped-medium-backward-pilot{
  width:452px;
  -webkit-clip-path: polygon(0 0, 400px 0, 452px 100%, 0% 100%);
}

.clipped-x-large-forward{
  clip-path: polygon(100% 0, 100% calc(100% - 96px), calc(100% - 96px) 100%, 0 100%, 0 0);
  -webkit-clip-path: polygon(100% 0, 100% calc(100% - 96px), calc(100% - 96px) 100%, 0 100%, 0 0);
}

</style>