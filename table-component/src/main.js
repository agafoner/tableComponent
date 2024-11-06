// import { createApp } from 'vue'
import AppTable from './AppTable.vue'
import {Vue,createApp} from 'vue';


export class TableCreator {
    static mountNewTable(selector,data) {
        const app = createApp(AppTable, data);
        app.mount(selector);
    }
}
window.TableVue = TableCreator;