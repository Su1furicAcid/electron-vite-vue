<template>
  <div class="container">
    <div class="card-container" :class="{ flipped: isFlipped }">
      <div class="card-front">
        <BirthdayCard />
        <button @click="flipCard" class="button">进入设置</button>
      </div>
      <div class="card-back">
        <EditInfo />
        <button @click="flipCard" class="button">返回</button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import BirthdayCard from './components/BirthdayCard.vue';
import EditInfo from './components/EditInfo.vue';

const isFlipped = ref(false);

const flipCard = () => {
  isFlipped.value = !isFlipped.value;
  document.body.style.overflow = 'hidden';
};
</script>

<style scoped>
.container {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 50vh;
  position: relative;
  top: -100px;
}

.card-container {
  perspective: 1000px;
  width: 600px;
  /* 增加宽度 */
  height: 400px;
  /* 增加高度 */
  position: relative;
}

.card-front,
.card-back {
  width: 100%;
  height: 100%;
  backface-visibility: hidden;
  transition: transform 0.6s;
  position: absolute;
  top: 0;
  left: 0;
}

.card-front {
  transform: rotateY(0deg);
}

.card-back {
  transform: rotateY(180deg);
}

.card-container.flipped .card-front {
  transform: rotateY(-180deg);
}

.card-container.flipped .card-back {
  transform: rotateY(0deg);
}

.button {
  margin-top: 20px;
  width: 150px;
  height: 40px;
  border-radius: 20px;
  border: none;
  font-size: 14px;
  font-weight: bold;
  cursor: pointer;
  transition: transform 0.3s ease-in-out, background 0.3s ease-in-out;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  background: linear-gradient(45deg, #6a11cb, #2575fc);
  color: white;
  position: relative;
  top: -120px;
}

.button:hover {
  transform: scale(1.1);
  background: linear-gradient(45deg, #2575fc, #6a11cb);
}
</style>