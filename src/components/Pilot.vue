<template>
  <div class="grid-item pilot-identity" style="color:white!important">
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
          {{ reverse(this.pilot.name) }}:{{ pilot.id }}//NDL-C-BLIND-REACH
        </div>
        <div class="row flex-container-cols add-padding">
          <div class="col grow-max flex-container-rows" style="padding-top:5px">
            <div class="row flex-container-cols">
              <div class="col col-primary"><span class="flavor-text"> Callsign: <b class="accent--text">{{
                capitalize(pilot.callsign) }}</b><br> Name (or legal alias): <b class="accent--text">{{ pilot.name
                    }}</b><br> Background: <b class="accent--text"> {{ pilot.background }} </b></span></div>
              <div class="col">CALLSIGN AVAILABLE <br> IDENTITY
                VERIFIED <br> PH/HR DATA REGISTERED</div>
            </div>
            <div style="padding-top:5px"> FRAME CONFIGURATION OPTIONS <span class="subtle--text">("H.A.S.E"
                OMNINET VAULT REMIT)</span></div>
            <div class="row" style="padding-top:5px"><span style="font-size: 22px; line-height: 15px;"> [
                HULL: <span class="stat-text accent--text" style="font-size: 24px;"> {{ pilot.mechSkills[0] }} </span>
                AGI: <span class="stat-text accent--text" style="font-size: 24px;"> {{ pilot.mechSkills[1] }} </span>
                SYS: <span class="stat-text accent--text" style="font-size: 24px;"> {{ pilot.mechSkills[2] }} </span>
                ENG: <span class="stat-text accent--text" style="font-size: 24px;"> {{ pilot.mechSkills[3] }} </span> ]
              </span></div>
            <div class="row flex-container-cols">
              <div class="col col-share">
                <span>PILOT SKILL TRIGGER AUDIT</span>
                <br>
                <div class="chip-container" v-for="skill in pilot.skills" :key="skill.id">
                  <span class="chip"><i aria-hidden="true" class="notranslate cci cci-skill"></i>{{ getSkill(skill)
                  }}</span>
                </div>
              </div>
              <div class="col col-share">
                <span>PILOT TALENT AUDIT</span>
                <br>
                <div class="chip-container" v-for="talent in pilot.talents" :key="talent.id">
                  <span class="chip"><i aria-hidden="true" class="notranslate cci cci-talent"></i>{{
                    getTalent(talent.id, talent.rank) }}</span>
                </div>
              </div>
            </div>
            <div v-if="pilot.level > 0" class="row flex-container-cols">
              <div class="col" style="padding-top:5px">
                <span>PROCUREMENT LICENSE AUDIT: LEVEL {{ pilot.level }}</span>
                <br>
                <div class="chip-container" v-for="license in pilot.licenses" :key="license.id">
                  <span class="chip"><i aria-hidden="true" class="notranslate cci cci-license"></i>{{
                    getLicense(license.id, license.rank) }}</span>
                </div>
              </div>
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
      <div class="flex-container-cols modal-buttons">
        <div class="row biometrics-container">
          <div class="biometrics flex-container-cols" @click="pilotModal">
            <div>
              <i aria-hidden="true" class="v-icon notranslate mdi mdi-fingerprint theme--dark grey--text text--darken-2"
                style="font-size: 36px; margin-top:36px;"></i>
            </div>
            <div style="width:100%">
              BIOMETRIC RECORD VALID [[{{ randomNumber(14, 22) }}PB]]<br />
              OHM C//{{ timeStamp(pilot.lastModified) }}
            </div>
          </div>
        </div>
        <div class="row biometrics-container">
          <div class="mech-record flex-container-cols" @click="mechModal">
            <div style="width:100%">
              MECHANICAL BLUEPRINT VALID [[{{ randomNumber(14, 22) }}TB]] <br />
              {{ activeMech.manufacturer.toUpperCase() }}-{{ activeMech.frame_name.toUpperCase() }} :: "{{ activeMech.name.toUpperCase() }}"
            </div>
            <div>
              <i aria-hidden="true"
                class="v-icon notranslate cci cci-reserve-mech theme--dark grey--text text--darken-2 larger"
                style="font-size: 42px; margin-top:1em;"></i>
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

<style scoped>
.larger::before {
  margin-top: 9px;
}

.mdi::before {
  margin-top: 9px;
}

.mech-record {
  margin-left: auto;
  text-align: right;
}

.modal-buttons {
  margin-top: 5px;
}
</style>

<script>
import 'external-svg-loader'
import lancerData from '@massif/lancer-data'
import ktbData from 'lancer-ktb-data'
import nrfawData from 'lancer-nrfaw-data'
import longrimData from 'lancer-longrim-data'

import wallflowerData from '@/assets/LCPs/wallflower-data-2.0.5'
/*Append the datasets within computed if your LCP has new items.
EX:
pilotGear() {
  return [...lancerData.pilot_gear, ...wallflowerData.pilot_gear]
},
*/

import PilotModal from '@/components/modals/PilotModal.vue'
import MechModal from '@/components/modals/MechModal.vue'

import Typer from '@/components/Typer.vue'

import ProgressBar from '@/components/ProgressBar.vue'
import Burden from '@/components/Burden.vue'

export default {
  components: {
    Burden,
    ProgressBar,
    Typer,
  },
  props: {
    animate: {
      type: Boolean,
      required: true,
    },
    pilot: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      activeMech: {},
      bond: {},
    }
  },
  computed: {
    pilotPortrait() {
      return `/pilots/${this.pilot.callsign.toUpperCase()}.webp`
    },
    mechPortrait() {
      return `/mechs/${this.pilot.callsign.toUpperCase()}.webp`
    },
    pilotGear() {
      return [...lancerData.pilot_gear]
    },
    mechWeapons() {
      return [...lancerData.weapons, ...ktbData.weapons, ...nrfawData.weapons, ...longrimData.weapons]
    },
    mechSystems() {
      return [...lancerData.systems, ...ktbData.systems, ...nrfawData.systems, ...longrimData.systems]
    },
    talents() {
      return [...lancerData.talents, ...ktbData.talents, ...nrfawData.talents, ...longrimData.talents]
    },
    skills() {
      return [...lancerData.skills]    
    },
    bonds() {
      return [...ktbData.bonds]
    },
    frames() {
      return [...lancerData.frames, ...ktbData.frames, ...nrfawData.frames, ...longrimData.frames]
    },
    mechManufacturerIcon() {
      if (this.activeMech.manufacturer)
        return `/faction-logos/${this.activeMech.manufacturer.toLowerCase()}.svg`
      return ''
    },
    pilotCode() {
      const identNameParts = this.pilot.name.split(' ')
      const identFirstName = identNameParts[0]
      const identLastNameParts = identNameParts.slice(1)
      let identName = ''
      identLastNameParts.forEach((part) => {
        identName += `${part}.`
      })
      identName += identFirstName;
			return `Union Administrative RM-4 Pilot Identification Protocol (IDENT) Record ${identName}: ${this.pilot.id} // ${this.pilot.background} // LOADOUT ${this.pilot.loadout.id} - MECH ${this.pilot.mechs[0].id} // HARDPOINTS ${this.pilot.mechs[0].loadouts[0].id}`;
		},
    pilotInfo() {
      const info = this.pilot

      let resolveGear = (type, item, idx, arr) => {
        item = item || {id: "", flavorName: ""};
        const gear = this.pilotGear.find((obj) => { return item.id === obj.id }) || null;
        item.flavorName = gear?.name || "ERR: DATA NOT FOUND";
        arr[idx] = item;
      }

      info.loadout.armor.forEach((item, index, array) => resolveGear('armor', item, index, array));
      info.loadout.weapons.forEach((item, index, array) => resolveGear('weapon', item, index, array));
      info.loadout.gear.forEach((item, index, array) =>resolveGear('gear', item, index, array));

      return info;
    },
  },
  created() {
    this.getActiveMech();
    this.getBond();
  },
  methods: {
    getBond() {
      this.bond = this.bonds.find((obj) => {
        return obj.id === this.pilot.bondId
      })
    },
    getActiveMech() {
      const activeMechID = this.pilot.state.active_mech_id
      const mech = this.pilot.mechs.find((obj) => {
        return obj.id === activeMechID
      })

      if (mech) {
        this.activeMech = mech
      }
      else {
        // default to missing frame in case pilot has no mechs
        this.pilot.mechs[0] ? this.activeMech = this.pilot.mechs[0] : lancerData.frames.find((obj) => { return obj.id === 'missing_frame' })
      }

      let frame = this.frames.find((obj) => {
        return obj.id === this.activeMech.frame
      })

      if (!frame)
        frame = lancerData.frames[0]

      this.activeMech.frame_description = frame.description
      this.activeMech.frame_name = frame.name
      this.activeMech.manufacturer = frame.source
      this.activeMech.mechtype = frame.mechtype.join(' // ')
    },
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
    getSkill(skill) {
      let sk = this.skills.find((x) => x.id == skill.id);
      return sk.name + " +" + (skill.rank * 2)
    },
    getTalent(id, value) {
      let talent = this.talents.find((x) => x.id == id);
      let response = talent.name + " "

      for (let i = 0; i < value; i++) {
        response += "I"
      }
      return response;
    },
    getLicense(id, value) {
      let frame = this.frames.find((x) => x.id == id);
      let response = frame.source + " " + frame.name + " "

      for (let i = 0; i < value; i++) {
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
    },
    pilotModal() {
      this.$oruga.modal.open({
        component: PilotModal,
        custom: true,
        trapFocus: true,
        props: {
          pilot: this.pilot,
          talents: this.talents,
          skills: this.skills,
          frames: this.frames,
        },
        class: 'custom-modal',
        width: 1920,
      })
    },
    mechModal() {
      this.$oruga.modal.open({
        component: MechModal,
        custom: true,
        trapFocus: true,
        props: {
          animate: this.animate,
          mech: this.activeMech,
          systemsData: this.mechSystems,
          weaponsData: this.mechWeapons,
          pilot: this.pilot,
        },
        class: 'custom-modal',
        width: 1920,
      })
    },
  },
}
</script>
