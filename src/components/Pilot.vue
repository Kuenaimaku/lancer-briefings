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
        <div class="age-pob">
          <div class="age">
            <h1>Subjective Age</h1>
            <h2>38U</h2>
          </div>
          <div class="pob">
            <h1>Place of Birth</h1>
            <h2>Evergreen</h2>
          </div>
        </div>
      </div>
      <div class="pilot-code">
        {{pilot.id}}
      </div>
    </div>
    <div class="gear-column">
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
    <!-- <div class="bonds-column" v-if="!this.pilot.bondId">
      lol
    </div> -->
    <div class="mech-column">
      <div class="mech-info">
        <div class="name">
          <h1>Active Mech</h1>
          <h2>Mech Name</h2>
        </div>
        <div class="manufacturer">
          <img :src="mechManufacturerIcon" class="manufacturer-icon"/>
          <div class="manufacturer-info">
            <h1>IPS-N</h1>
            <h2>Raleigh</h2>
          </div>
        </div>
        <div class="role">
          Striker / Defender
        </div>
      </div>
      <img :src="this.pilot.mechs[0].cloud_portrait" class="portrait"/>
    </div>
  </div>
</template>

<script>
import PilotModal from "@/components/modals/PilotModal.vue";

export default {
  components: {
    PilotModal,
  },
  props: {
    pilot: {
      type: Object,
      required: true,
    },
  },
  computed: {
    pilotPortrait() {
      return `/pilots/${this.pilot.callsign}.png`;
    },
    mechPortrait() {
      return `/mechs/${this.pilot.callsign}.png`;
    },
    mechManufacturerIcon(){
      return `/icons/ips-n.svg`
    }
  },
  methods: {
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
