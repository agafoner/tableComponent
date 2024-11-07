<template>
    <div class="head-cell" @click="editInProcess=true">
        <span> {{cellKey}}</span>
        <input v-if="currentCell.type=='formula' && currentCell.readonly=='false' && editInProcess"
        :value="currentCell.formula"
        @change="setFormula" 
        @blur="setFormula"  
        @vue:mounted="({ el}) => el.focus()"
        >
        <span class="formula" v-else-if="currentCell.type=='formula'">
            <br>
            {{ currentCell.formula.slice(1) }}
        </span>
    </div>
</template>

<script setup>
import { inject, ref } from 'vue';
const store = inject('store');
const props = defineProps(['cellKey']);

const currentCell = store.headCellByKey(props.cellKey)
const editInProcess=ref(false);

function setFormula(e) {
    store.headCellByKey(props.cellKey).formula=e.target.value;
    editInProcess.value=false;
}

</script>

<style>
    .formula {
        font-size: small;
        color: dimgray;
    }
    .head-cell{
        overflow: hidden;
        width: 85px;
        box-sizing: border-box;

    }
    input{
        width: 100%;
        box-sizing: border-box;

    }
</style>