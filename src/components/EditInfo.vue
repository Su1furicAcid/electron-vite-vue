<template>
    <div class="container">
        <div>Edit Info</div>
        <div class="edit-birthday">
            <div>出生日期: <input type="date" v-model="userBirthday" /></div>
        </div>
        <div class="edit-n">
            <div>这次聚会计划在 <input type="number" v-model="N" /> 天前提醒</div>
        </div>
        <div class="edit-plan">
            <div>聚会计划日期: {{ nextPlan }}</div>
        </div>
        <button @click="confirmPlanDate">确认计划日期</button>
    </div>
</template>

<script setup lang="ts">
import { ref, onMounted, watch, Ref } from 'vue'
import debounce from '../utils/Debounce';
import { getToday, getPreviousDay, getNearestSaturday, getNextBirthday } from '../utils/ComputeDay';
import { EventBus } from '../utils/EventBus';

declare global {
    interface Window {
        electronAPI: {
            readData: (key: string) => Promise<string | null>;
            writeData: (key: string, value: string | number) => Promise<void>;
        };
    }
}

const today = getToday()
const userBirthday = ref('1990-01-01')
const N: Ref<string> = ref("7")
let nextPlan = ref('1990-01-01')

onMounted(async () => {
    userBirthday.value = await window.electronAPI.readData('birthday') || '1990-01-01'
    N.value = await window.electronAPI.readData('N') || "7"
    updateNextPlan()
})

const saveDataDebounced = debounce(async (key: string, value: string | number) => {
    await window.electronAPI.writeData(key, value)
    EventBus.emit('dataUpdated', { key, value });
}, 300)

watch(userBirthday, (newValue) => {
    saveDataDebounced('birthday', newValue)
    updateNextPlan()
})

watch(N, (newValue) => {
    saveDataDebounced('N', newValue)
    updateNextPlan()
})

const updateNextPlan = () => {
    const nextBirthday = getNextBirthday(userBirthday.value, today)
    const nDaysBefore = getPreviousDay(nextBirthday, Number(N.value))
    const dayOfWeek = new Date(nDaysBefore).getDay()

    if (dayOfWeek >= 1 && dayOfWeek <= 5) {
        nextPlan.value = getNearestSaturday(nDaysBefore)
    } else {
        nextPlan.value = nDaysBefore
    }
}

const confirmPlanDate = () => {
    const nextBirthday = getNextBirthday(userBirthday.value, today)
    const nDaysBefore = getPreviousDay(nextBirthday, Number(N.value))
    const dayOfWeek = new Date(nDaysBefore).getDay()

    if (dayOfWeek >= 1 && dayOfWeek <= 5) {
        const nearestSaturday = getNearestSaturday(nDaysBefore)
        const userConfirmed = confirm(`计划日期是工作日，是否改为最近的一个周六: ${nearestSaturday}？`)
        if (userConfirmed) {
            nextPlan.value = nearestSaturday
        } else {
            nextPlan.value = nDaysBefore
        }
    } else {
        nextPlan.value = nDaysBefore
    }
    alert(`计划日期: ${nextPlan.value}`)
    saveDataDebounced('nextPlan', nextPlan.value)
}
</script>

<style scoped>
.container {
    display: flex;
    flex-direction: column;
    gap: 10px;
    width: 100%;
    height: 100%;
}
</style>