import { createApp } from "vue";
import { createPinia } from "pinia";

import App from "./App.vue";

import "./assets/sass/main.scss";

const app = createApp(App)
  .use(createPinia())
  .mount("#app");
