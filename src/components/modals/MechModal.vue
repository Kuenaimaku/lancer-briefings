<template>
  <div class="mech-modal">
    <div class="mech-header-container">
      <div class="section-header clipped-medium-backward-bio">
        <img src="/icons/npc.svg">
        <h1>{{ mech.name }} [{{ mech.frame_name }}]</h1>
      </div>
      <div class="rhombus-back"></div>
    </div>
    <div class="mech">
      <div class="mech-gear">
        <div class="mech-column">
          <div v-if="mainMounts.length > 0" class="gear-row mech-mount">
            <div v-for="mainMount in mainMounts" class="main-mount">
              <h1>Main Mount</h1>
              <h2>{{ mainMount.flavorName }}</h2>
            </div>
          </div>
          <div v-if="flexMounts.length > 0 && flexMounts.some(element => element.id !== null)" class="gear-row mech-mount">
            <div v-for="flexMount in flexMounts" class="flex-mount">
              <h1>Flex Mount</h1>
              <h2>{{ flexMount.flavorName }}</h2>
            </div>
          </div>
          <div v-if="heavyMounts.length > 0" class="gear-row mech-mount">
            <div v-for="heavyMount in heavyMounts" class="heavy-mount">
              <h1>Heavy Mount</h1>
              <h2>{{ heavyMount.flavorName }}</h2>
            </div>
          </div>
        </div>
        <div class="mech-column">
          <div v-if="mechSystems.length > 0" class="gear-row mech-system">
            <div v-for="system in mechSystems" class="system">
              <h1>System</h1>
              <h2>{{ system.flavorName }}</h2>
            </div>
          </div>
          <div v-else class="no-systems">
            <h1>SYSTEMS</h1>
            <h2>ERR: NO SYSTEMS FOUND</h2>
          </div>
        </div>
      </div>
      <div class="mech-notes markdown">
        <div v-html="getFrameDescription()"/>
      </div>
    </div>
  </div>
  <div class="mech-modal portrait">
    <div class="mech-header-container">
      <div class="section-header clipped-medium-backward-mech">
        <img src="/icons/mech.svg">
        <h1>Mech Artwork</h1>
      </div>
      <div class="rhombus-back">
        &nbsp;
      </div>
    </div>
    <div class="mech">
      <img :src="mechPortrait" class="portrait">
    </div>
  </div>
</template>

<script>
import { VueMarkdownIt } from '@f3ve/vue-markdown-it';

export default {
  components: {
    VueMarkdownIt,
  }, inheritAttrs: false,
  props: {
    animate: {
      type: Boolean,
      required: true,
    },
    mech: {
      type: Object,
      required: true,
    },
    systemsData: {
      type: Array,
      required: true,
    },
    weaponsData: {
      type: Array,
      required: true,
    },
    pilot: {
      type: Object,
      required: true,
    }
  },
  data() {
    return {
      markdownHtml: true,
      activeLoadout: {},
      mainMounts: [],
      flexMounts: [],
      heavyMounts: [],
      mechSystems: [],
    }
  },
  beforeUpdate() {
  },
  mounted() {
    if (this.mech) {
      this.getActiveLoadout();
    }
    if (this.weaponsData && typeof this.weaponsData !== 'undefined') {
      this.getMechMounts();
    }
    if (this.systemsData)
      this.getMechSystems();
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
    getActiveLoadout() {
      const activeLoadoutIdx = this.mech.active_loadout_index
      this.activeLoadout = this.mech.loadouts[activeLoadoutIdx]
    },
    getMechMounts() {
      let resolveMountSlots = (type, item, idx, arr) => {
        item = item || {id: "", flavorName: ""}
        const mountObj = this.weaponsData.find((obj) => { return item.id === obj.id }) || null
        item.flavorName = mountObj?.name || "";

        switch (type) {
          case 'Main':
            if (item.id == "") break;
            this.mainMounts = [...this.mainMounts, item];
            break;
          case 'Flex':
            if (item.id == "") break;
            this.flexMounts = [...this.flexMounts, item];
            break;
          // case "Auxiliary":
          //   this.mainMounts = [...this.mainMounts, item];
          //   break;
          case 'Heavy':
            if (item.id == "") break;
            this.heavyMounts = [...this.heavyMounts, item];
            break;
          default:
            if (item.id == "") break;
            this.mainMounts = [...this.mainMounts, item];
            break;
        }
      }
      this.activeLoadout.mounts.forEach((mount) => {
        const mountSlots = mount.slots
        const mountSlotsIsArray = Array.isArray(mountSlots) && mountSlots.length > 0
        if (mountSlotsIsArray) {
          mountSlots.forEach((slot, index, array) => resolveMountSlots(mount.mount_type, slot.weapon, index, array));
        }

        const mountExtras = mount.extra
        const mountExtrasIsArray = Array.isArray(mountExtras) && mountExtras.length > 0
        if (mountExtrasIsArray) {
          mountExtras.forEach((extra, index, array) => resolveMountSlots(mount.mount_type, extra.weapon, index, array));
        }
      })
    },
    getMechSystems() {
      let resolveMechSystems = (item, idx, arr) => {
        item = item || {id: "", flavorName: ""}
        const mountObj = this.systemsData.find((obj) => { return item.id === obj.id }) || null
        item.flavorName = mountObj?.name || "ERR: DATA NOT FOUND";

        this.mechSystems = [...this.mechSystems, item]
      }
      this.activeLoadout.systems.forEach(resolveMechSystems);
    },
    getFrameDescription(){
      return `<p> ${this.mech.frame_description} </p>`
    }
  },
}
</script>
