import ElementPlus from "element-plus";
import * as ElementPlusIconsVue from "@element-plus/icons-vue";
import "element-plus/dist/index.css";
import { App } from 'vue'

// // reset
import "element-plus/theme-chalk/src/reset.scss";
import "element-plus/theme-chalk/src/index.scss";
// // for dark mode
import "element-plus/theme-chalk/src/dark/css-vars.scss";

import "./styles/css-vars.scss";
import "./styles/app.scss";

export const elementPlus = (app: App) => {
    app.use(ElementPlus);
    for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
        app.component(key, component);
    }
};
