<template>
  <TableComponent :tableData="props.tableData"></TableComponent>
  
</template>

<script setup>
import { onMounted, provide } from 'vue';
import TableComponent from './components/TableComponent.vue';
import { store } from './components/store';


const props = defineProps(['tableDataAsJSON']);
provide('store',store)
onMounted(()=> {
  // this.$store.store.init(props.tableData);
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
</style>
