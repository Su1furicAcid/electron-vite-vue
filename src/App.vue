<template>
  <div class="container">
    <div v-if="showIntro" class="intro-screen">
      <h1>欢迎来到生日聚会便签</h1>
      <button @click="continueToApp">继续</button>
    </div>
    <div v-else class="card-container" :class="{ flipped: isFlipped }" @mousedown="startDrag" @mousemove="onDrag"
      @mouseup="endDrag">
      <div class="card-front">
        <div class="title-bar">
          <div class="title">生日聚会便签</div>
          <div class="window-controls">
            <button @click="minimizeWindow">-</button>
            <button @click="closeWindow">×</button>
          </div>
        </div>
        <BirthdayCard />
        <div class="drag-guide" v-if="showDragGuide">
          <Icon :name="arrowLeft" />  
          向左拖动鼠标进入设置
        </div>
      </div>
      <div class="card-back">
        <div class="title-bar">
          <div class="window-controls">
          </div>
        </div>
        <EditInfo />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import BirthdayCard from './components/BirthdayCard.vue';
import EditInfo from './components/EditInfo.vue';
import Icon from './components/Icon.vue';

const arrowLeft = 'ArrowLeft';

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

const showIntro = ref(true);
const isFlipped = ref(false);
const startX = ref(0);
const isDragging = ref(false);
const showDragGuide = ref(true);

const continueToApp = () => {
  showIntro.value = false;
};

const startDrag = (event: MouseEvent) => {
  startX.value = event.clientX;
  isDragging.value = true;
};

const onDrag = (event: MouseEvent) => {
  if (!isDragging.value) return;
  const deltaX = event.clientX - startX.value;
  if (deltaX > 100) {
    isFlipped.value = false;
    isDragging.value = false;
    showDragGuide.value = false;
  } else if (deltaX < -100) {
    isFlipped.value = true;
    isDragging.value = false;
  }
};

const endDrag = () => {
  isDragging.value = false;
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
  height: 100%;
  width: 100%;
  position: relative;
  top: -43px;
  left: -39px;
}

.intro-screen {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  height: 456px;
  width: 509px;
  background-color: #ffffff;
  color: #333;
  text-align: center;
  border-radius: 10px;
  position: absolute;
  top: -180px;
  left: -220px;
}

.intro-screen h1 {
  font-size: 24px;
  margin-bottom: 20px;
  color: #333;
}

.intro-screen button {
  padding: 10px 20px;
  font-size: 16px;
  cursor: pointer;
  background: linear-gradient(45deg, #6a11cb, #2575fc);
  color: white;
  border: none;
  border-radius: 5px;
  transition: linear 0.3s;
}

.intro-screen button:hover {
  background: linear-gradient(45deg, #6a11cb, #2575fc);
  transform: scale(1.1);
}

.title-bar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  height: 10px;
  color: white;
  -webkit-app-region: drag;
  position: relative;
  top: 22px;
  left: -87px;
  z-index: 100;
}

.title-bar .title {
  font-size: 16px;
  font-weight: 600;
  margin-left: 10px;
  position: relative;
  left: 100px;
}

.title-bar .window-controls {
  display: flex;
  gap: 10px;
  padding-right: 10px;
  z-index: 200;
}

.title-bar .window-controls button {
  border: none;
  color: black;
  font-weight: bolder;
  cursor: pointer;
  -webkit-app-region: no-drag;
  width: 30px;
  height: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
  border-radius: 10px;
  transition: transform 0.3s ease-in-out, background 0.3s ease-in-out;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  pointer-events: auto;
}

.title-bar .window-controls button:hover {
  transform: scale(1.1);
}

.card-container {
  perspective: 1000px;
  width: 600px;
  height: 420px;
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

.drag-guide {
  position: absolute;
  bottom: -60px;
  left: -34px;
  width: 100%;
  text-align: center;
  font-size: 14px;
  color: white;
  animation: blink 1s infinite;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
}

@keyframes blink {

  0%,
  100% {
    opacity: 1;
  }

  50% {
    opacity: 0;
  }
}
</style>