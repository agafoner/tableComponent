<template>
  <table>
    <thead>
      <tr>
        <th id="null-cell"></th>
        <th v-for="cell in store.tableHead">{{ cell.key }}</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="(line,index) in store.tableData">
        <th id="index">{{ index+1 }}</th>
        <td v-for="cell in Object.keys(line)">
          <Cell :line="index" :col="cell">

          </Cell>
        </td>
      </tr>
    </tbody>

  </table>
  
</template>

<script setup>
import { onMounted, provide } from 'vue';
import TableComponent from './components/TableComponent.vue';
import Cell from './components/Cell.vue';
import { store } from './components/store';


const props = defineProps(['tableDataAsJSON']);
provide('store',store)
onMounted(()=> {
  store.init(tableDataAsJSON);
  console.log('dima props tableDataAsJSON:', props.tableDataAsJSON)
  console.log('store: ', store)


})


</script>

<style>
#table-vue {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
table {
  border: 2px solid #9b9b9b;
}
th {
  background-color: azure;
  width: 100px;
}
#null-cell {
  width: 20px;
  background-color: azure;
}
td {
  height: 20px;
  background-color: antiquewhite;
}
#index {
  width: 20px;
}
</style>
