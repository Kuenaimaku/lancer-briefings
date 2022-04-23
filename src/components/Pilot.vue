<template>
  <div class="pilot-wrapper" @click="pilotModal">
    <div class="pilot-column">
      <img :src="this.pilot.cloud_portrait" class="portrait"/>
      <div class="pilot-info">
        <div class="callsign">
          <h1>Callsign</h1>
          <h2>{{pilot.callsign}}</h2>
        </div>
        <div class="name">
          <h1>Name or Legal Alias</h1>
          <h2>{{pilot.name}}</h2>
        </div>
        <div class="age-pob" v-if="this.pilot.age">
          <div class="age">
            <h1>Subjective Age</h1>
            <h2>{{pilot.age}}</h2>
          </div>
          <div class="pob">
            <h1>Place of Birth</h1>
            <h2>{{pilot.pob}}</h2>
          </div>
        </div>
      </div>
      <div class="pilot-code">
        <VueWriter :array="pilotCode" :typeSpeed="20" :eraseSpeed="0" :intervals="200" :delay="10000"/>
      </div>
    </div>
    <div class="gear-column" v-if="!this.pilot.bondId">
      <div class="gear-row">
        <div class="armor">
          <h1>Pilot Armor</h1>
          <h2>{{pilot.loadout.armor[0].flavorName}}</h2>
        </div>
        <div class="gear">
          <h1>Pilot Gear</h1>
          <h2>{{pilot.loadout.gear[0].flavorName}}</h2>
        </div>
      </div>
      <div class="gear-row">
        <div class="weapon">
          <h1>Pilot Weapon</h1>
          <h2>{{pilot.loadout.weapons[0].flavorName}}</h2>
        </div>
        <div class="gear">
          <h1>Pilot Gear</h1>
          <h2>{{pilot.loadout.gear[1].flavorName}}</h2>
        </div>
      </div>
      <div class="gear-row">
        <div class="armor">
          <h1>Pilot Weapon</h1>
          <h2>{{pilot.loadout.weapons[1].flavorName}}</h2>
        </div>
        <div class="gear">
          <h1>Pilot Gear</h1>
          <h2>{{pilot.loadout.gear[2].flavorName}}</h2>
        </div>
      </div>
    </div>
    <div class="bonds-column" v-if="this.pilot.bondId">
      <div class="bonds">
        <div class="bond">
          <h1>Bond</h1>
          <h2>The Harlequinn</h2>
        </div>
        <div class="experience">
          <h1>Experience</h1>
          <ProgressBar :value="this.pilot.xp" :max="8" color="rgba(125, 187, 187, 1)"/>
        </div>
        <div class="stress">
          <h1>Stress</h1>
          <ProgressBar :value="this.pilot.stress" :max="8" color="#F00"/>
        </div>
      </div>
      <div class="burdens">
        <Burden v-for="item in this.pilot.burdens" :key="item.id" :burden="item" />
      </div>
    </div>
    <div class="mech-column">
      <div class="mech-info">
        <div class="name">
          <h1>Active Mech</h1>
          <h2>{{activeMech.name}}</h2>
        </div>
        <div class="manufacturer">
          <svg
              :data-src="mechManufacturerIcon + '#Content'"
              :style="`width:48px; height:48px; fill:var(--primary-color)`"
          >
          </svg>
          <div class="manufacturer-info">
            <h1>{{activeMech.manufacturer}}</h1>
            <h2>{{activeMech.frame_name}}</h2>
          </div>
        </div>
        <div class="role">
          {{activeMech.mechtype}}
        </div>
      </div>
      <img :src="this.pilot.mechs[0].cloud_portrait" class="portrait"/>
    </div>
  </div>
</template>

<script>
import 'external-svg-loader'
import lancerData from 'lancer-data'

import PilotModal from "@/components/modals/PilotModal.vue";
import ProgressBar from"@/components/ProgressBar.vue";
import Burden from "@/components/Burden.vue"

export default {
  components: {
    Burden,
    PilotModal,
    ProgressBar
  },
  props: {
    pilot: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
    activeMech: {},
    }
  },
  computed: {
    pilotPortrait() {
      return `/pilots/${this.pilot.callsign}.png`;
    },
    mechPortrait() {
      return `/mechs/${this.pilot.callsign}.png`;
    },
    mechManufacturerIcon(){
      if (this.activeMech.manufacturer){
        return `/icons/${this.activeMech.manufacturer.toLowerCase()}.svg`
      }
    },
    pilotCode() {
      return  [`${this.pilot.id} // ${this.pilot.background} // LOADOUT ${this.pilot.loadout.id} - MECH ${this.pilot.mechs[0].id} // HARDPOINTS ${this.pilot.mechs[0].loadouts[0].id}`]
    },
  },
  mounted() {
    this.getActiveMech();
  },
  methods: {
    getActiveMech() {
      var mech = this.pilot.mechs.find(obj => {
        return obj.active == true;
      })

      if (mech){
        this.activeMech = mech;
      } else {
        this.activeMech = this.pilot.mechs[0]
      }

      var frame = lancerData.frames.find( obj => {
        return obj.id == this.activeMech.frame;
      })

      if (!frame){
        frame = this.lancerData.frames[0]
      }

      this.activeMech['frame_name'] = frame.name;
      this.activeMech['manufacturer'] = frame.source;
      this.activeMech['mechtype'] = frame.mechtype.join(' // ');


    },
    pilotModal() {
      this.$oruga.modal.open({
        component: PilotModal,
        custom: true,
        trapFocus: true,
        props: {
          pilot: this.pilot,
        },
        class: "custom-modal",
        width: 1920,
      });
    },
  },
};
</script>
