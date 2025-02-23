<template>
    <div class="container">
        <div>Birthday Card</div>
        <div class="next-birthday">
            <div>下次生日日期: {{ nextBirthday }}</div>
        </div>
        <div class="days-to-next-birthday">
            <div>距离下次生日还有 {{ daysToNextBirthday }} 天</div>
        </div>
        <div class="next-n-days">
            <div>距离下次生日前 {{ N }} 天的日期: {{ nDaysBeforeNextBirthday }}</div>
        </div>
        <div class="next-plan">
            <div>下次的计划日期: {{ nextPlan }}</div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { getNextBirthday, getDaysToNextBirthday, getPreviousDay } from '../utils/ComputeDay'
import { EventBus } from '../utils/EventBus'

declare global {
    interface Window {
        electronAPI: {
            readData: (key: string) => Promise<string | null>;
            writeData: (key: string, value: string | number) => Promise<void>;
        };
    }
}

// 定义响应式变量
const birthday = ref<string>('1990-01-01')
const nextBirthday = ref<string>('')
const daysToNextBirthday = ref<number>(0)
const N = ref<string>('7')
const nDaysBeforeNextBirthday = ref<string>('1990-01-01')
const nextPlan = ref<string>('1990-01-01')

// 获取今天日期
const today: string = new Date().toISOString().split('T')[0]

const fetchData = async () => {
    // 获取出生日期
    birthday.value = await window.electronAPI.readData('birthday') || '1990-01-01'
    // 根据出生日期和今天日期计算下次生日的日期
    nextBirthday.value = getNextBirthday(birthday.value, today)
    // 计算距离下次生日的天数
    daysToNextBirthday.value = getDaysToNextBirthday(nextBirthday.value, today)
    // 获取 N 的值
    N.value = await window.electronAPI.readData('N') || '7'
    // 计算距离下次生日前 N 天的日期
    nDaysBeforeNextBirthday.value = getPreviousDay(nextBirthday.value, Number(N.value))
    // 获取下次的计划日期
    nextPlan.value = await window.electronAPI.readData('nextPlan') || nDaysBeforeNextBirthday.value
}

onMounted(async () => {
    await fetchData()
    EventBus.on('dataUpdated', fetchData)
})

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