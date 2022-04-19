<template>
  <Header :header="this.header" />
  <Sidebar />
  <div id="router-view-container">
    <router-view />
  </div>
  <svg
    style="visibility: hidden; position: absolute"
    width="0"
    height="0"
    xmlns="http://www.w3.org/2000/svg"
    version="1.1"
  >
    <defs>
      <filter id="round">
        <feGaussianBlur in="SourceGraphic" stdDeviation="5" result="blur" />
        <feColorMatrix
          in="blur"
          mode="matrix"
          values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 19 -5"
          result="goo"
        />
        <feComposite in="SourceGraphic" in2="goo" operator="atop" />
      </filter>
    </defs>
  </svg>
  <audio autoplay>
    <source src="/startup.ogg" type="audio/ogg" />
  </audio>
  <Footer />
</template>

<script>
import Header from "./components/layout/Header.vue";
import Sidebar from "./components/layout/Sidebar.vue";
import Footer from "./components/layout/Footer.vue";

export default {
  components: {
    Header,
    Footer,
    Sidebar,
  },

  data() {
    return {
    };
  },
  
  mounted() {
    this.$router.push("/status");
  },
  methods: {},
};
</script>

<style>
#app {
  width: 1901px;
  height: 924px;
  overflow: hidden !important;
  border-right: 1px solid #ff0;
  border-bottom: 1px solid #ff0;
}
</style>
