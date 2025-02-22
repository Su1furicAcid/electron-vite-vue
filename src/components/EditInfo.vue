<template>
    <div class="container">
        <div>Edit Info</div>
        <div class="edit-birthday">
            <div>生日: <input type="date" v-model="userBirthday" /></div>
        </div>
        <div class="edit-n">
            <div>计划在 <input type="number" v-model="N" /> 天前提醒</div>
        </div>
        <div class="edit-plan">
            <div>聚会计划日期: {{ nextPlan }}</div>
        </div>
        <button @click="confirmPlanDate">确认计划日期</button>
    </div>
</template>

<script setup lang="ts">
import { ref, onMounted, watch, Ref } from 'vue'

declare global {
    interface Window {
        electronAPI: {
            readData: (key: string) => Promise<string | null>;
            saveData: (key: string, value: string | number) => Promise<void>;
        };
    }
}

import { getToday, getPreviousDay, getNearestSaturday } from '../utils/ComputeDay';

const today = getToday()
const userBirthday = ref('1990-01-01')
const N: Ref<string> = ref("7")
let nextPlan = ref('1990-01-01')

onMounted(async () => {
    userBirthday.value = await window.electronAPI.readData('birthday') || '1990-01-01'
    N.value = await window.electronAPI.readData('N') || "7"
    updateNextPlan()
})

watch(userBirthday, async (newValue) => {
    await window.electronAPI.saveData('birthday', newValue)
    updateNextPlan()
})

watch(N, async (newValue) => {
    await window.electronAPI.saveData('N', newValue)
    updateNextPlan()
})

const updateNextPlan = () => {
    const nDaysBefore = getPreviousDay(userBirthday.value, Number(N.value))
    const dayOfWeek = new Date(nDaysBefore).getDay()

    if (dayOfWeek >= 1 && dayOfWeek <= 5) {
        nextPlan.value = getNearestSaturday(nDaysBefore)
    } else {
        nextPlan.value = nDaysBefore
    }
}

const confirmPlanDate = () => {
    const nDaysBefore = getPreviousDay(userBirthday.value, Number(N.value))
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