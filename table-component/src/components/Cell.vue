<template>
    <div :class="isSelect ? 'select-cell' : ''" @click="editInProcess=true">
        <select v-if="store.headCellByKey(props.col).type == 'select'" v-model="store.tableData[props.line][props.col]"
        :disabled="readonly">
            <option v-for="option in store.headCellByKey(props.col).selectList">{{ option }}</option>
        </select>
        <input v-else-if="editInProcess && !readonly" 
        :value="value"
         @change="setCell" 
         @blur="setCell"  
         @vue:mounted="({ el}) => el.focus()">
        <span v-else> {{ value }}</span>
    </div>
</template> 
    
<script setup>
import { ref, computed, inject, onMounted } from 'vue';

const props = defineProps(['line','col']);
const store = inject('store');

const editInProcess=ref(false);
const type=ref();
const readonly = computed(()=> {
    return store.headCellByKey(props.col).readonly=='true' || store.headCellByKey(props.col).formula;
})
const isSelect = ref(store.headCellByKey(props.col).type == 'select');
// const readonly=ref();
onMounted(()=> {
    type.value = store.headCellByKey(props.col).type;
    // readonly.value = store.headCellByKey(props.col).readonly;
    console.log('dima refs:', readonly, type.value)
})

function getFormulaString() {
    return store.headCellByKey(props.col).formula;
}

function setCell(e) {
    store.tableData[props.line][props.col]=e.target.value;
    editInProcess.value = false;
}

const value = computed(()=> {
    if (type.value=='formula') {
        store.tableData[props.line][props.col]=store.calcFormula(getFormulaString(),props.line,props.col)
        console.log(store.tableData);
        return store.tableData[props.line][props.col]
    }
    else {
        return store.tableData[props.line][props.col]
    }
})

    
</script>
        
<style>
input {
    width: 100%;
    box-sizing: border-box;
}
select {
    height: 23px;
    width: 90%;
    text-align: center;
}
.select-cell {
    text-align: center;
}
</style>