import { createApp } from "vue";
import App from "./App.vue";

import Oruga from "@oruga-ui/oruga-next";
import "@oruga-ui/oruga-next/dist/oruga.min.css";

import "@mdi/font/css/materialdesignicons.css";

import "@/assets/styles/_reset.css";
import "@/assets/styles/_base.css";
import "@/assets/styles/_animations.css";

import router from "./router";
import VueWriter from "vue-writer";

createApp(App).use(router).use(Oruga).use(VueWriter).mount("#app");
// TODO: Introduce eslint with vue3 + typescript support
