<template>
  <div class="mech-modal">
    <div class="mech-header-container">
      <div class="section-header clipped-medium-backward-bio">
        <img src="/icons/npc.svg">
        <h1>{{ mech.name }} [{{ mech.frame_name }}]</h1>
      </div>
      <div class="rhombus-back">
&nbsp;
      </div>
    </div>
    <div class="mech">
      <div class="mech-modal-column">
        <div class="gear-row">
          <div
            v-for="mainMount in mainMounts"
            class="weapon"
          >
            <h1>Main Mount</h1>
            <h2>{{ mainMount.flavorName }}</h2>
          </div>
          <div
            v-for="flexMount in flexMounts"
            class="mech-flex"
          >
            <h1>Flex Mount</h1>
            <h2>{{ flexMount.flavorName }}</h2>
          </div>
        </div>
        <div class="gear-row">
          <div
            v-for="heavyMount in heavyMounts"
            class="mech-heavy"
          >
            <h1>Heavy Mount</h1>
            <h2>{{ heavyMount.flavorName }}</h2>
          </div>
        </div>
        <div class="gear-row">
          <div
            v-for="system in mechSystems"
            class="mech-systems"
          >
            <h1>System</h1>
            <h2>{{ system.flavorName }}</h2>
          </div>
        </div>
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
      <img :src="mech.cloud_portrait" class="portrait">
    </div>
  </div>
</template>

<script>
// import Markdown from "vue3-markdown-it";

export default {
  components: {},
  inheritAttrs: false,
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
  },
  data() {
    return {
      // markdownHtml: true,
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
    if (this.weaponsData && typeof this.weaponsData !== 'undefined'){
      this.getMechMounts();
    }
    if (this.systemsData)
      this.getMechSystems();
  },
  methods: {
    getActiveLoadout() {
      const activeLoadoutIdx = this.mech.active_loadout_index
      this.activeLoadout = this.mech.loadouts[activeLoadoutIdx]
    },
    getMechMounts() {
      const {weaponsData, mainMounts, flexMounts, heavyMounts} = this;
      var resolveMountSlots = (type, item, idx, arr) => {
        if (item && Object.prototype.hasOwnProperty.call(item, 'flavorName') && typeof item.flavorName !== 'undefined' && !(item.flavorName.length > 0))
          item.flavorName = weaponsData.find((obj) => { return item.id === obj.id }).name

        switch (type) {
          case 'Main':
            this.mainMounts = [...this.mainMounts, item]
            break
          case 'Flex':
            this.flexMounts = [...this.flexMounts, item]
            break
          // case "Auxiliary":
          //   this.auxiliaryMounts = [...this.auxiliaryMounts, item];
          //   break;
          case 'Heavy':
            this.heavyMounts = [...this.heavyMounts, item]
            break
          default:
            break
        }
      }
      this.activeLoadout.mounts.forEach((mount) => {
        const mountSlots = mount.slots
        const mountSlotsIsArray = Array.isArray(mountSlots) && mountSlots.length > 0
        console.log(mountSlotsIsArray)
        if (mountSlotsIsArray) {
          mountSlots.forEach((slot, index, array) => resolveMountSlots(mount.mount_type, slot.weapon, index, array));
        }

        const mountExtras = mount.extra
        const mountExtrasIsArray = Array.isArray(mountExtras) && mountExtras.length > 0
        if (mountExtrasIsArray) {
          mountExtras.forEach((extra, index, array) => resolveMountSlots(mount.mount_type, extra.weapon, index, array));
        }

        const missingWeaponID = 'missing_mechweapon'
        const missingWeaponArr = [this.weaponsData.find((obj) => { return missingWeaponID === obj.id })]
        if (!mountSlotsIsArray && !mountExtrasIsArray)
          resolveMountSlots(mount.mount_type, missingWeaponArr[0], 0, missingWeaponArr).bind(this)
      })
    },
    getMechSystems() {
      var resolveMechSystems = (item, idx, arr) => {
        if (item && Object.prototype.hasOwnProperty.call(item, 'flavorName') && typeof item.flavorName !== 'undefined' && !(item.flavorName.length > 0)) {
          item.flavorName = this.systemsData.find((obj) => { return item.id === obj.id }).name
        }
        // else {
        //   const missingSystemID = 'missing_mechsystem'
        //   item.flavorName = this.systemsData.find((obj) => { return missingSystemID === obj.id }).name
        //   arr[idx] = item
        // }
        this.mechSystems = [...this.mechSystems, item]
      }
      console.log(this.activeLoadout.systems[0])
      this.activeLoadout.systems.forEach(resolveMechSystems);
      console.log(this.mechSystems)

    },
  },
}
</script>
