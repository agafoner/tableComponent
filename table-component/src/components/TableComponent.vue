<template>
<p> Table </p>
<p> {{ data }}</p>
<p> {{ props.tableData }}</p>
</template>

<script setup>
import { computed } from 'vue';

    const data = computed(() => {
        return window.tableData;
    })
    const props = defineProps(['tableData']);

</script>
    
<style>
</style>