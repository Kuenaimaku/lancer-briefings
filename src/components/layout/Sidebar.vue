<template>
  <div class="sidebar-page">
    <section class="sidebar-layout">
      <o-sidebar
        position="static"
        :mobile="mobile"
        :expand-on-hover="expandOnHover"
        :reduce="reduce"
        open
      >
        <router-link class="clipped-bottom-right" to="/status"
          ><img src="/icons/mission-icon.svg" /><span>Status</span></router-link
        >
        <router-link class="clipped-bottom-right" to="/pilots"
          ><img src="/icons/pilot-icon.svg" /><span>Pilots</span></router-link
        >
        <router-link class="clipped-bottom-right" to="/events"
          ><img src="/icons/events-icon.svg" /><span>Logs</span></router-link
        >
      </o-sidebar>
    </section>
  </div>
</template>

<script>
export default {
  data() {
    return {
      expandOnHover: false,
      mobile: "reduced",
      reduce: false,
    };
  },
};
</script>

<style></style>
