<template>
  <div class="container">
    <div class="card-container" :class="{ flipped: isFlipped }">
      <div class="card-front">
        <div class="title-bar">
          <div class="window-controls">
            <button @click="minimizeWindow">—</button>
            <button @click="closeWindow">×</button>
          </div>
        </div>
        <BirthdayCard />
        <button @click="flipCard" class="button">进入设置</button>
      </div>
      <div class="card-back">
        <div class="title-bar">
          <div class="window-controls">
            <button @click="minimizeWindow">—</button>
            <button @click="closeWindow">×</button>
          </div>
        </div>
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

declare global {
  interface Window {
    electronAPI: {
      readData: (key: string) => Promise<string>;
      onDataReceived: (callback: () => void) => void;
      writeData: (key: string, value: string) => Promise<void>;
      sendData: (data: Record<string, string>) => void;
      minimizeWindow: () => void;
      closeWindow: () => void;
    };
  }
}
const isFlipped = ref(false);

const flipCard = () => {
  isFlipped.value = !isFlipped.value;
  document.body.style.overflow = 'hidden';
};

const minimizeWindow = () => {
  window.electronAPI.minimizeWindow();
};

const closeWindow = () => {
  window.electronAPI.closeWindow();
};
</script>

<style scoped>
.container {
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  height: 50vh;
  position: relative;
  top: -14vh;
}

.title-bar {
  display: flex;
  justify-content: flex-end;
  align-items: center;
  width: 100%;
  height: 10px;
  color: white;
  -webkit-app-region: drag;
  position: relative;
  top: -6vh;
  left: -45px;
  z-index: 100;
}

.title-bar .window-controls {
  display: flex;
  gap: 10px;
  padding-right: 10px;
}

.title-bar .window-controls button {
  background: linear-gradient(45deg, #6a11cb, #2575fc);
  border: none;
  color: white;
  cursor: pointer;
  -webkit-app-region: no-drag;
  width: 30px;
  height: 30px;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 10px;
  transition: transform 0.3s ease-in-out, background 0.3s ease-in-out;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

.title-bar .window-controls button:hover {
  transform: scale(1.1);
  background: linear-gradient(45deg, #2575fc, #6a11cb);
}

.card-container {
  perspective: 1000px;
  width: 600px;
  height: 400px;
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
  top: -18vh;
}

.button:hover {
  transform: scale(1.1);
  background: linear-gradient(45deg, #2575fc, #6a11cb);
}
</style>