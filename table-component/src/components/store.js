import { reactive } from "vue";

export const store = reactive( {
    rawTableData: {},
    tableData: {},
    tableHead: {},

    init(jsonString) {
        this.rawTableData = JSON.parse(jsonString);
        this.tableData = this.rawTableData.data;
        this.tableHead = this.rawTableData.head;
        if (this.tableData.length == 0 || this.tableHead.length == 0) {
            console.error('tableApp: Incoming data error',this.tableData,this.tableHead);
        } else console.log('tableApp: Store initiated')
    }
    

})

export default {
    store: store
}