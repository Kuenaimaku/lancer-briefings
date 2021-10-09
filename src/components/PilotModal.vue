<template>
	<div class="pilot-modal">
		<div class="pilot-header-container">
			<div class="section-header clipped-medium-backward-bio">
				<img src="/pilot-icon.svg"/>
				<h1>{{pilot.alias}} [{{pilot.callsign}}]</h1>
			</div>
			<div class="rhombus-back">&nbsp;</div>
			
		</div>
		<div class="pilot">
			<Markdown :source="bio" class="markdown"/>
		</div>
	</div>
	<div class="pilot-modal portrait">
		<div class="pilot-header-container">
			<div class="section-header clipped-medium-backward-pilot">
				<img src="/portrait-icon.svg"/>
				<h1>Character Artwork</h1>
			</div>
			<div class="rhombus-back">&nbsp;</div>
			
		</div>
		<div class="pilot">
			<img :src="portrait" class="portrait"/>
		</div>
	</div>
</template>

<script>
import Markdown from 'vue3-markdown-it';

export default {
  components: {
		Markdown
  },
	data(){
		return {
			bio: "",
		}
	},
  props: {
    pilot: {
      type: Object,
      required: true,
    }
  },
  computed:{
		portrait(){
			return `/${this.pilot.callsign}.png`
		},
	},
	created(){
      let self = this;
      let md = `/markdown/${this.pilot.callsign}.md`
      var client = new XMLHttpRequest();
      client.open('GET', md);
      client.onreadystatechange = function() {
          self.bio = client.responseText;
      }
    client.send();
	},
	methods:{

	}
}
</script>

<style lang="scss" scoped>

.pilot-modal {
	div .section-header {
    background-color: #7DBBBB;
    border-color: #7DBBBB;
    height: 52px;
    display: inline-flex;
    gap: 15px;
    padding-left: 16px;
		
		h1 {
			font-size: 26px;
			margin: 0%;
			align-self: center;
			font-family: "Big Shoulders Display", cursive;
			font-weight: 800;
			text-transform: uppercase;
			letter-spacing: 0.1em;
		}
  }
}

</style>