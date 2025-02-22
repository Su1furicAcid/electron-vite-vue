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

<script setup>
import { ref, onMounted } from 'vue'
import { getNextBirthday, getDaysToNextBirthday } from '../utils/ComputeDay'

// 定义响应式变量
const birthday = ref('1990-01-01')
const nextBirthday = ref('')
const daysToNextBirthday = ref(0)
const N = ref(7)
const nDaysBeforeNextBirthday = ref('1990-01-01')
const nextPlan = ref('1990-01-01')

// 获取今天日期
const today = new Date().toISOString().split('T')[0]

onMounted(async () => {
    // 获取出生日期
    birthday.value = await window.electronAPI.readData('birthday') || '1990-01-01'
    // 根据出生日期和今天日期计算下次生日的日期
    nextBirthday.value = getNextBirthday(birthday.value, today)
    // 计算距离下次生日的天数
    daysToNextBirthday.value = getDaysToNextBirthday(nextBirthday.value, today)
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