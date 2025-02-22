<template>
  <div class="container">
    <BirthdayCard />
    <EditInfo />
  </div>
</template>

<script setup lang="ts">
import BirthdayCard from './components/BirthdayCard.vue';
import EditInfo from './components/EditInfo.vue';
</script>

<style scoped>
.container {
  display: flex;
  flex-direction: column;
  gap: 10px;
}
</style>