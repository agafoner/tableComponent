<template>
    <!-- {{ line }} {{ col }} {{ type }} {{ readonly }} -->
    
    <span v-if="readonly">{{value}}</span>

</template> 
    
<script setup>
import { ref, computed, inject, onMounted } from 'vue';
const store = inject('store');


const type=ref(0);
const readonly=ref(0);
onMounted(()=> {
    type.value = store.headCellByKey(props.col).type;
    readonly.value = store.headCellByKey(props.col).readonly;
})
const props = defineProps(['line','col']);
const value = computed(()=> {
    if (type.value=='formula') {
        return 'formula'
    }
    else {
        return store.tableData[props.line][props.col]
    }
})
    
</script>
        
<style>
</style>