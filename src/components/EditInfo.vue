<template>
    <div class="container">
        <div class="title">Edit Info</div>
        <!--添加今日日期的选择 dateToday-->>
        <div class="edit-today">
            <div>今日日期: <input type="date" v-model="dateToday" class="input" /></div>
        </div>
        <div class="edit-birthday">
            <div>出生日期: <input type="date" v-model="userBirthday" class="input" /></div>
        </div>
        <div class="edit-n">
            <div>这次聚会计划在 <input type="number" v-model="N" class="input short-input" /> 天前提醒</div>
        </div>
        <div class="edit-plan">
            <div>聚会计划日期: {{ nextPlan }}</div>
        </div>
        <button @click="confirmPlanDate" class="button">确认计划日期</button>
    </div>
</template>

<script setup lang="ts">
import { ref, onMounted, watch, Ref } from 'vue';
import debounce from '../utils/Debounce';
import { getToday, getPreviousDay, getNearestSaturday, getNextBirthday } from '../utils/ComputeDay';

const dateToday = ref(getToday());
const userBirthday = ref('1990-01-01');
const N: Ref<string> = ref("7");
let nextPlan = ref('1990-01-01');
//保存今日日期
//const today = ref(dateToday);

onMounted(async () => {
    userBirthday.value = await window.electronAPI.readData('birthday') || '1990-01-01';
    N.value = await window.electronAPI.readData('N') || "7";
    dateToday.value =await window.electronAPI.readData('dateToday') || getToday();
    updateNextPlan();
});

const saveDataDebounced = debounce(async (key: string, value: string) => {
    await window.electronAPI.writeData(key, value);
    window.electronAPI.sendData({ key, value });
}, 300);

watch(userBirthday, (newValue) => {
    saveDataDebounced('birthday', newValue);
    updateNextPlan();
});

watch(N, (newValue) => {
    saveDataDebounced('N', newValue);
    updateNextPlan();
});

//监听今日日期的变化
watch(dateToday, (newValue) => {
    saveDataDebounced('dateToday', newValue);
    updateNextPlan();
});

//修改算法中使用的日期
const updateNextPlan = () => {
    const nextBirthday = getNextBirthday(userBirthday.value, dateToday.value);
    const nDaysBefore = getPreviousDay(nextBirthday, Number(N.value));
    const dayOfWeek = new Date(nDaysBefore).getDay();

    if (dayOfWeek >= 1 && dayOfWeek <= 5) {
        nextPlan.value = getNearestSaturday(nDaysBefore);
    } else {
        nextPlan.value = nDaysBefore;
    }
};

const confirmPlanDate = () => {
    const nextBirthday = getNextBirthday(userBirthday.value, dateToday.value);
    const nDaysBefore = getPreviousDay(nextBirthday, Number(N.value));
    const dayOfWeek = new Date(nDaysBefore).getDay();

    if (dayOfWeek >= 1 && dayOfWeek <= 5) {
        const nearestSaturday = getNearestSaturday(nDaysBefore);
        const userConfirmed = confirm(`计划日期是工作日，是否改为最近的一个周六: ${nearestSaturday}？`);
        if (userConfirmed) {
            nextPlan.value = nearestSaturday;
        } else {
            nextPlan.value = nDaysBefore;
        }
    } else {
        nextPlan.value = nDaysBefore;
    }
    alert(`计划日期: ${nextPlan.value}`);
    saveDataDebounced('nextPlan', nextPlan.value);
};
</script>

<style scoped>
@import url('https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;600&display=swap');

.container {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 20px;
    max-width: 450px;
    margin: 40px auto;
    padding: 30px;
    border-radius: 16px;
    box-shadow: 0 8px 16px rgba(0, 0, 0, 0.15);
    font-family: 'Poppins', sans-serif;
    color: #2c3e50;
    position: relative;
    overflow: hidden;
}

.title {
    font-size: 26px;
    font-weight: 700;
    text-align: center;
    margin-bottom: 10px;
    display: flex;
    align-items: center;
    gap: 10px;
    text-shadow: 2px 2px 10px rgba(0, 0, 0, 0.2);
}

.input {
    width: 100%;
    padding: 10px;
    border-radius: 8px;
    border: 1px solid #ccc;
    font-size: 14px;
    font-family: 'Poppins', sans-serif;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    transition: border-color 0.3s ease-in-out;
}

.input:focus {
    border-color: #2575fc;
    outline: none;
}

.short-input {
    width: 60px;
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
}

.button:hover {
    transform: scale(1.1);
    background: linear-gradient(45deg, #2575fc, #6a11cb);
}
</style>