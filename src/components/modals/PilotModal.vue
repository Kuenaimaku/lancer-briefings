<template>
	<div class="pilot-modal">
		<div class="pilot-header-container">
			<div class="section-header clipped-medium-backward-bio">
				<img src="/icons/pilot.svg" />
				<h1>DOSSIER</h1>
			</div>
			<div class="rhombus-back">&nbsp;</div>
		</div>
		<div class="pilot markdown">
			<div v-html="getHistory()" />
		</div>
	</div>
	<div class="pilot-modal pilot-identity" style="color:white!important">
		<div class="header">
			<div class="col grow-max">
				<div class="heading h1">{{ pilot.callsign }}</div>
				<div class="heading h2">({{ pilot.name }}) </div>
			</div>
			<div class="col"><img src="/faction-logos/msmc.svg"></div>
		</div>
		<div class="body">
			<div class="add-padding"> Union Administrative RM-4 Pilot Identification Protocol (IDENT) Record
				{{ pilot.id }} </div>
			<div class="flex-container-rows">
				<div class="row add-padding">
					{{ reverse(pilot.name) }}:{{ pilot.id }}//NDL-C-BLIND-REACH
				</div>
				<div class="row flex-container-cols add-padding">
					<div class="col grow-max flex-container-rows" style="padding-top:5px">
						<div class="row flex-container-cols" >
							<div class="col col-primary"><span class="flavor-text"> Callsign: <b class="accent--text">{{
								capitalize(pilot.callsign) }}</b><br> Name (or legal alias): <b
										class="accent--text">{{ pilot.name }}</b><br> Background: <b
										class="accent--text"> {{ pilot.background }} </b></span></div>
							<div class="col">CALLSIGN AVAILABLE <br> IDENTITY
								VERIFIED <br> PH/HR DATA REGISTERED</div>
						</div>
						<div style="padding-top:5px"> FRAME CONFIGURATION OPTIONS <span class="subtle--text">("H.A.S.E"
								OMNINET VAULT REMIT)</span></div>
						<div class="row" style="padding-top:5px"><span
								style="font-size: 22px; line-height: 15px;"> [
								HULL: <span class="stat-text accent--text" style="font-size: 24px;"> {{ pilot.mechSkills[0] }} </span> 
								AGI: <span class="stat-text accent--text" style="font-size: 24px;"> {{ pilot.mechSkills[1] }} </span> 
								SYS: <span class="stat-text accent--text" style="font-size: 24px;"> {{ pilot.mechSkills[2] }} </span> 
								ENG: <span class="stat-text accent--text" style="font-size: 24px;"> {{ pilot.mechSkills[3] }} </span> ] </span></div>
						<div class="row flex-container-cols">
							<div class="col col-share">
								<span>PILOT SKILL TRIGGER AUDIT</span>
								<br>
								<div class="chip-container" v-for="skill in pilot.skills" :key="skill.id">						
									<span class="chip"><i aria-hidden="true" class="notranslate cci cci-skill"></i>{{ getSkill(skill.id) }}</span>
								</div>
							</div>
							<div class="col col-share">
								<span>PILOT TALENT AUDIT</span>
								<br>
								<div class="chip-container" v-for="talent in pilot.talents" :key="talent.id">						
									<span class="chip"><i aria-hidden="true" class="notranslate cci cci-talent"></i>{{ getTalent(talent.id, talent.rank) }}</span>
								</div>
							</div>
						</div>
						<div v-if="pilot.level > 0" class="row flex-container-cols">
							<div class="col" style="padding-top:5px">
								<span>PROCUREMENT LICENSE AUDIT: LEVEL {{ pilot.level }}</span>
								<br>
								<div class="chip-container" v-for="license in pilot.licenses" :key="license.id">						
									<span class="chip"><i aria-hidden="true" class="notranslate cci cci-license"></i>{{ getLicense(license.id, license.rank) }}</span>
								</div>
							</div>
						</div>
						<div class="row biometrics-container">
							<div class="biometrics"><i aria-hidden="true"
									class="v-icon notranslate mdi mdi-fingerprint theme--dark grey--text text--darken-2"
									style="font-size: 36px; margin-top:1em;"></i> BIOMETRIC RECORD VALID [[{{randomNumber(14,22)}}PB]] ::
								OHM
								C//{{ timeStamp(pilot.lastModified) }}</div>
						</div>
					</div>
					<div class="col">
						<div class="pilot-image-container">
							<div class="pilot-image-border">
								<img :src="pilotPortrait" class="portrait" />
							</div>
						</div>
					</div>
				</div>
			</div>
			<hr role="separator" aria-orientation="horizontal" class="ma-2 v-divider theme--dark">
			<div class="row row--dense"><span class="overline" style="line-height: 13px !important; opacity: 0.4;">
					Improper use of this IDENT record and/or its constituent data by the record holder or any other
					persons is punishable under the DoJ/HR A-645-c. This record is the property of the Union
					Administrative Office and the information herein must be transmitted on request under
					NDL-C-DISCORDANT-BREATH encryption protocols. This RM-4 record must be updated every five (5)
					Cradle
					Standard Years of objective time to retain GMS licensing rights. Far-field operatives that
					anticipate deployments lasting longer than five Cradle Standard Years that have not been issued
					a
					man-portable Omninet Hook should apply for the RM-11-B IDENT Supplemental (b) Extension. Contact
					your local Union Adminstrative Officer for any other matters regarding this
					record.  V-CDL//M-265-114-831 (A) </span></div>
		</div>
	</div>
</template>

<script>
import { VueMarkdownIt } from '@f3ve/vue-markdown-it';
import { capitalize } from 'vue';

export default {
	components: {
		VueMarkdownIt,
	},
	inheritAttrs: false,
	props: {
		pilot: {
			type: Object,
			required: true,
		},
		skills: {
			type: Array,
			required:true
		},
		talents: {
			type: Array,
			required:true
		},
		frames: {
			type: Array,
			required:true
		}
	},
	data() {
		return {
			markdownHtml: true,
		};
	},
	computed: {
		pilotPortrait() {
			return `/pilots/${this.pilot.callsign.toUpperCase()}.webp`
		},
		mechPortrait() {
			return `/mechs/${this.pilot.callsign.toUpperCase()}.webp`
		},
	},
	methods: {
		getHistory() {
			if (this.pilot.history === "") {
				return `<p> <h2> [ERR: REDACTED] </h2> </p>`
			}

			let response = "<p>"

			if (this.pilot.text_appearance !== "") {
				response += `<h2>APPEARANCE</h2> ${this.pilot.text_appearance} </hr>`;
			}

			if (this.pilot.history !== "") {
				response += `<h2>HISTORY</h2> ${this.pilot.history} </hr>`;
			}

			response += "</p>"

			return response;
		},
		getSkill(id) {
			let skill = this.skills.find((x) => x.id == id);
			return skill.name
		},
		getTalent(id, value) {
			let talent = this.talents.find((x) => x.id == id);
			let response = talent.name + " "
			
			for (let i = 0; i < value; i++){
				response += "I"
			}
			return response;
		},
		getLicense(id, value) {
			let frame = this.frames.find((x) => x.id == id);
			let response = frame.source + " " + frame.name + " "
			
			for (let i = 0; i < value; i++){
				response += "I"
			}
			return response;
		},
		capitalize(str) {
			return str.split(' ').map(word => word[0].toUpperCase() + word.slice(1)).join(' ');
		},
		reverse(str) {
			const words = str.split(' ')
			const reversed = words.reverse()
			const reversedResult = words.join('.')
			return reversedResult
		},
		randomNumber(max, min) {
			const rand = Math.random() * (max - min) + min
			const power = Math.pow(10, 2)
			return Math.floor(rand * power) / power
		},
		timeStamp(str) {
			let date = new Date(str);
			let y = date.getFullYear();
			let m = date.getMonth();
			let d = date.getDate();
			let h = date.getHours();
			let mi = date.getMinutes();
			let s = date.getSeconds();
			let ms = date.getMilliseconds();
			let tz = date.getTimezoneOffset();
			y += 2990;
			return new Date(y, m, d, h, mi, s, ms).toISOString();
		}
	},
};
</script>
