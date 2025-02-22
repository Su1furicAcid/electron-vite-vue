<!-- 
功能:
1. 展示下次生日日期
2. 展示下次生日距离今天的天数
3. 展示距离下次生日前 n 天的日期
4. 展示下次的计划日期
-->
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
import { getNextBirthday, getDaysToNextBirthday } from '../utils/ComputeDay'
// 获取出生日期
const birthday = window.electronAPI.readData('birthday') || '2000-01-01'
// 获取今天日期
const today = new Date().toISOString().split('T')[0]
// 根据出生日期和今天日期计算下次生日的日期
const nextBirthday = getNextBirthday(birthday, today)
// 计算距离下次生日的天数
const daysToNextBirthday = getDaysToNextBirthday(nextBirthday, today)
</script>

<style scoped>
.container {
    display: flex;
    flex-direction: column;
    gap: 10px;
}
</style>