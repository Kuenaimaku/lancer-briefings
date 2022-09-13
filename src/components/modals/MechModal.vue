<template>
  <div class="mech-modal">
    <div class="mech-header-container">
      <div class="section-header clipped-medium-backward-bio">
        <img src="/icons/npc.svg" />
        <h1>{{ mech.name }} [{{ mech.frame_name }}]</h1>
      </div>
      <div class="rhombus-back">&nbsp;</div>
    </div>
    <div class="mech">
      <div class="mech-modal-column">
        <div class="gear-row">
          <div v-for="mainMount in mainMounts" class="mech-main">
            <h1>Main Mount</h1>
            <h2>{{ mech.loadouts.armor[0].flavorName }}</h2>
          </div>
          <div v-for="flexMount in flexMounts" class="mech-flex">
            <h1>Flex Mount</h1>
            <h2>{{ mech.loadouts.gear[0].flavorName }}</h2>
          </div>
        </div>
        <div class="gear-row">
          <div v-for="heavyMount in heavyMounts" class="mech-heavy">
            <h1>Heavy Mount</h1>
            <h2>{{ mech.loadouts.weapons[0].flavorName }}</h2>
          </div>
        </div>
        <div class="gear-row">
          <div v-for="system in mechSystems" class="mech-systems">
            <h1>Systems</h1>
            <h2>{{ mech.loadouts.gear[1].flavorName }}</h2>
          </div>
        </div>
      </div>
    </div>
  </div>
  <div class="mech-modal portrait">
    <div class="mech-header-container">
      <div class="section-header clipped-medium-backward-mech">
        <img src="/icons/mech.svg" />
        <h1>Mech Artwork</h1>
      </div>
      <div class="rhombus-back">&nbsp;</div>
    </div>
    <div class="mech">
      <img :src="mech.cloud_portrait" class="portrait" />
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
    };
  },
  computed: {
    getActiveLoadout() {
      let activeLoadoutIdx = this.mech.loadouts.active_loadout_index;
      this.activeLoadout = this.pilot.mechs.loadouts[activeLoadoutIdx];
      console.log("ACTIVE LOADOUT: ", this.activeLoadout);
    },
    getMechMounts() {
      function resolveMountSlots(type, item, idx, arr) {
        if (item && item.hasOwnProperty("flavorName") && typeof item.flavorName !== 'undefined') {
          !item.flavorName.length > 0 ? item.flavorName = this.weaponsData.find(obj => { return item.id == obj.id; }).name : null;
        }
        // else {
        //   item.flavorName = missingWeapon;
        //   arr[idx] = item;
        // }
        switch (type) {
          case "Main":
            this.mainMounts = [...this.mainMounts, item];
            break;
          case "Flex":
            this.flexMounts = [...this.flexMounts, item];
            break;
          // case "Auxiliary":
          //   this.auxiliaryMounts = [...this.auxiliaryMounts, item];
          //   break;
          case "Heavy":
            this.heavyMounts = [...this.heavyMounts, item];
            break;
          default:
            break;
        }
      }
      this.activeLoadout.mounts.forEach(mount => {

        let mountSlots = mount.slots;
        mountSlotsIsArray = Array.isArray(mountslots) && mechSlots.length > 0;
        if (mountSlotsIsArray) {
          mountSlots.forEach(function (slot, index, array) {
            resolveMountSlots(mount.mount_type, slot.weapon, index, array);
          });
        }

        let mountExtras = mount.extra;
        mountExtrasIsArray = Array.isArray(mountExtras) && mountExtras.length > 0;
        if (mountExtrasIsArray) {
          mountExtras.forEach(function (extra, index, array) {
            resolveMountSlots(mount.mount_type, extra.weapon, index, array);
          });
        }

        let missingWeaponID = "missing_mechweapon";
        let missingWeaponArr = [weaponsData.find(obj => { return missingWeaponID == obj.id })];
        !mountSlotsIsArray && !mountExtrasIsArray ? resolveMountSlots(mount.mount_type, missingWeaponArr[0], 0, missingWeaponArr) : null;

      });
      console.log("MAIN MOUNTS: ", this.mainMounts);
      console.log("FLEX MOUNTS: ", this.flexMounts);
      console.log("HEAVY MOUNTS: ", this.heavyMounts);
    },
    getMechSystems() {
      function resolveMechSystems(item, idx, arr) {
        if (item && item.hasOwnProperty("flavorName") && typeof item.flavorName !== 'undefined') {
          !item.flavorName.length > 0 ? item.flavorName = this.systemsData.find(obj => { return item.id == obj.id; }).name : null;
        }
        else {
          let missingSystemID = "missing_mechsystem";
          item.flavorName = systemsData.find(obj => { return missingSystemID == obj.id }).name;
          arr[idx] = item;
        }
      }

      this.activeLoadout.systems.forEach(function(system, index, array) {
        resolveMechSystems(system, index, array);
      });

      console.log("SYSTEMS: ", this.mechSystems);

    },
  },
  methods: {},
};
</script>
