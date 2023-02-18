import { createApp } from "vue";
import { createPinia } from "pinia";

import App from "./App.vue";
import router from "./router";

import "./assets/sass/main.scss";
import 'lazysizes';
import { webpClass } from './util.js';

const app = createApp(App);

app.use(createPinia());
app.use(router);
webpClass();

app.mount("#app");
