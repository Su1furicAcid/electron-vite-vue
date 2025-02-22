<template>
  <div class="container">
    <BirthdayCard />
  </div>
</template>

<script setup lang="ts">
import BirthdayCard from './components/BirthdayCard.vue';
</script>

<style scoped>
.container {
  display: flex;
  flex-direction: column;
  gap: 10px;
}
</style>