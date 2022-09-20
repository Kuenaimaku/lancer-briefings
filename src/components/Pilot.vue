<template>
	<div class="pilot-wrapper">
    <div class="pilot-column" @click="pilotModal">
      <img :src="pilotInfo.cloud_portrait" class="portrait" />
      <div class="pilot-info">
        <div class="callsign">
          <h1>Callsign</h1>
          <h2>{{ pilotInfo.callsign }}</h2>
        </div>
        <div class="name">
          <h1>Name or Legal Alias</h1>
          <h2>{{ pilotInfo.name }}</h2>
        </div>
        <div
          v-if="pilotInfo.age || pilotInfo.pob"
          class="age-pob">
          <div
            v-if="pilotInfo.pob.length > 0"
            class="pob">
            <h1>Place of Birth</h1>
            <h2>{{ pilot.pob }}</h2>
          </div>
          <div
            v-if="pilotInfo.age.length > 0"
            class="age">
            <h1>Subjective Age</h1>
            <h2>{{ pilot.age }}</h2>
          </div>
        </div>
      </div>
      <div class="pilot-code">
        <VueWriter :array="pilotCode" :type-speed="25" :erase-speed="0" :start="900" :delay="5000" />
      </div>
    </div>
    <div
      v-if="!pilotInfo.bondId"
      class="gear-column">
      <div class="gear-row">
        <div class="armor">
          <h1>Pilot Armor</h1>
          <h2>{{ pilotInfo.loadout.armor[0].flavorName }}</h2>
        </div>
        <div class="gear">
          <h1>Pilot Gear</h1>
          <h2>{{ pilotInfo.loadout.gear[0].flavorName }}</h2>
        </div>
      </div>
      <div class="gear-row">
        <div class="weapon">
          <h1>Pilot Weapon</h1>
          <h2>{{ pilotInfo.loadout.weapons[0].flavorName }}</h2>
        </div>
        <div class="gear">
          <h1>Pilot Gear</h1>
          <h2>{{ pilotInfo.loadout.gear[1].flavorName }}</h2>
        </div>
      </div>
      <div class="gear-row">
        <div class="weapon">
          <h1>Pilot Weapon</h1>
          <h2>{{ pilotInfo.loadout.weapons[1].flavorName }}</h2>
        </div>
        <div class="gear">
          <h1>Pilot Gear</h1>
          <h2>{{ pilotInfo.loadout.gear[2].flavorName }}</h2>
        </div>
      </div>
    </div>
    <div
      v-if="pilotInfo.bondId"
      class="bonds-column">
      <div class="bonds">
        <div class="bond">
          <h1>Bond</h1>
          <h2>{{ bond.name }}</h2>
        </div>
        <div class="experience">
          <h1>Experience</h1>
          <ProgressBar
            :value="pilotInfo.xp"
            :max="8"
            color="rgba(125, 187, 187, 1)"
          />
        </div>
        <div class="stress">
          <h1>Stress</h1>
          <ProgressBar
            :value="pilotInfo.stress"
            :max="8" color="#F00" />
        </div>
      </div>
      <div
        v-if="pilotInfo.burdens.length > 0"
        class="burdens">
        <Burden
          v-for="item in pilotInfo.burdens"
          :key="item.id"
          :burden="item"
          :animate="animate"/>
    </div>
    <div
      v-else
      class="gear-column">
      <div class="gear-row">
        <div class="armor">
          <h1>Pilot Armor</h1>
          <h2>{{ pilotInfo.loadout.armor[0].flavorName }}</h2>
        </div>
        <div class="gear">
          <h1>Pilot Gear</h1>
          <h2>{{ pilotInfo.loadout.gear[0].flavorName }}</h2>
        </div>
      </div>
      <div class="gear-row">
        <div class="weapon">
          <h1>Pilot Weapon</h1>
          <h2>{{ pilotInfo.loadout.weapons[0].flavorName }}</h2>
        </div>
        <div class="gear">
          <h1>Pilot Gear</h1>
          <h2>{{ pilotInfo.loadout.gear[1].flavorName }}</h2>
        </div>
      </div>
      <div class="gear-row">
        <div class="weapon">
          <h1>Pilot Weapon</h1>
          <h2>{{ pilotInfo.loadout.weapons[1].flavorName }}</h2>
        </div>
        <div class="gear">
          <h1>Pilot Gear</h1>
          <h2>{{ pilotInfo.loadout.gear[2].flavorName }}</h2>
        </div>
      </div>
    </div>
    </div>
    <div class="mech-column" @click="mechModal">
      <div class="mech-info">
        <div class="name">
          <h1>Active Mech</h1>
          <h2>{{ activeMech.name }}</h2>
        </div>
        <div class="manufacturer">
          <svg :data-src="`${mechManufacturerIcon}#Content`" style="width:48px; height:48px; fill:var(--primary-color)"></svg>
          <div class="manufacturer-info">
            <h1>{{ activeMech.manufacturer }}</h1>
            <h2>{{ activeMech.frame_name }}</h2>
          </div>
        </div>
        <div class="role">
          {{ activeMech.mechtype }}
        </div>
      </div>
      <img :src="pilot.mechs[0].cloud_portrait" class="portrait">
    </div>
  </div>
</template>

<script>
import 'external-svg-loader'
import lancerData from 'lancer-data'
import ktbData from 'lancer-ktb-data'
import nrfawData from 'lancer-nrfaw-data'
import longrimData from 'lancer-longrim-data'

import PilotModal from '@/components/modals/PilotModal.vue'
import MechModal from '@/components/modals/MechModal.vue'

import ProgressBar from '@/components/ProgressBar.vue'
import Burden from '@/components/Burden.vue'

export default {
  components: {
    Burden,
    ProgressBar,
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
      knownGear: [...lancerData.pilot_gear, ...nrfawData.pilot_gear],
      activeMech: {},
      bond: {},
    }
  },
  computed: {
    pilotPortrait() {
      return `/pilots/${this.pilot.callsign}.webp`
    },
    mechPortrait() {
      return `/mechs/${this.pilot.callsign}.webp`
    },
    mechWeapons() {
      return [...lancerData.weapons, ...ktbData.weapons, ...nrfawData.weapons, ...longrimData.weapons]
    },
    mechSystems() {
      return [...lancerData.systems, ...ktbData.systems, ...nrfawData.systems, ...longrimData.systems]
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
			return [
				`Union Administrative RM-4 Pilot Identification Protocol (IDENT) Record ${identName}: ${this.pilot.id} // ${this.pilot.background} // LOADOUT ${this.pilot.loadout.id} - MECH ${this.pilot.mechs[0].id} // HARDPOINTS ${this.pilot.mechs[0].loadouts[0].id}`,
			];
		},
    pilotInfo() {
      const info = this.pilot

      var resolveGear = (type, item, idx, arr) => {
        item = item || {id: "", flavorName: ""};
        const gear = this.knownGear.find((obj) => { return item.id === obj.id }) || null;
        item.flavorName = gear?.name || "ERR: DATA NOT FOUND";
        arr[idx] = item;
      }

      info.loadout.armor.forEach((item, index, array) => resolveGear('armor', item, index, array));
      info.loadout.weapons.forEach((item, index, array) => resolveGear('weapon', item, index, array));
      info.loadout.gear.forEach((item, index, array) =>resolveGear('gear', item, index, array));

      return info;
    },
  },
  mounted() {
    this.getActiveMech();
    this.getBond();
  },
  methods: {
    getBond() {
      this.bond = ktbData.bonds.find((obj) => {
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

      const knownFrames = [...lancerData.frames, ...ktbData.frames, ...nrfawData.frames, ...longrimData.frames]
      let frame = knownFrames.find((obj) => {
        return obj.id === this.activeMech.frame
      })

      if (!frame)
        frame = lancerData.frames[0]

      this.activeMech.frame_name = frame.name
      this.activeMech.manufacturer = frame.source
      this.activeMech.mechtype = frame.mechtype.join(' // ')
    },
    pilotModal() {
      this.$oruga.modal.open({
        component: PilotModal,
        custom: true,
        trapFocus: true,
        props: {
          pilot: this.pilot,
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
        },
        class: 'custom-modal',
        width: 1920,
      })
    },
  },
}
</script>
