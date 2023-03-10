import { createApp } from "vue";
import { createPinia } from "pinia";
import { autoAnimatePlugin } from '@formkit/auto-animate/vue'

import App from "./App.vue";
import router from "./router";

import "./assets/sass/main.scss";

const app = createApp(App).use(autoAnimatePlugin);

app.use(createPinia());
app.use(router);

app.mount("#app");
