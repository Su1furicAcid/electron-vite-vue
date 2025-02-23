<template>
    <component :is="icon" />
</template>

<script setup lang="ts">
import * as icons from 'lucide-vue-next';
import { defineProps } from 'vue';
const props = defineProps<{ name: string }>();
const icon = (icons as Record<string, any>)[props.name];
</script>