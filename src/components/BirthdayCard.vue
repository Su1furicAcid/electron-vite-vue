<template>
    <div class="container" :style="{ background: themeConfig.background }">
        <!-- 添加今日日期的展示 -->
        <div class="today-date" :style="{ color: themeConfig.titleColor } ">
            今日日期: {{ dateToday }}
        </div>

        <div v-for=" (color, index) in themeConfig.cardColors" :key="index" class="card"
            :style="{ background: color, color: themeConfig.textColor }">
            <Icon :name="icons[index]" />
            <div>{{ labels[index] }} <span>{{ values[index] }}</span></div>
        </div>

        <!-- 主题选择 -->
        <div class="theme-selector">
            <button class="theme-button" :class="{ expanded: showThemes }" @click="toggleThemes">
                🎨 主题
            </button>
            <div class="theme-options" :style="{ opacity: showThemes ? 1 : 0 }">
                <button v-for="(theme, key) in themes" :key="key" :class="{ active: selectedTheme === key }"
                    :style="{ background: theme.cardColors[1], borderColor: theme.titleColor }"
                    @click="changeTheme(key)">
                    {{ themeNames[key] }}
                </button>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { ref, onMounted, computed } from 'vue';
import { getNextBirthday, getDaysToNextBirthday, getPreviousDay, getToday } from '../utils/ComputeDay';
import Icon from './Icon.vue';
import { ThemeType, themes, ThemeConfig } from '../utils/Theme';

const icons = ['Calendar', 'Clock', 'CalendarCheck', 'Flag'];
const labels = ['下次生日日期:', '距离下次生日还有', '距离下次生日前 ', '下次的计划日期:'];
const values = computed(() => [nextBirthday.value, daysToNextBirthday.value + ' 天', N.value + " 天的日期:" + nDaysBeforeNextBirthday.value, nextPlan.value]);
const selectedTheme = ref<ThemeType>('energetic');
const themeConfig = computed(() => themes[selectedTheme.value]);
const themeNames: Record<ThemeType, string> = {
    elegant: "淡雅",
    energetic: "活力",
    calm: "冷静"
};
const showThemes = ref(false);
const changeTheme = (theme: ThemeType) => selectedTheme.value = theme;
const toggleThemes = () => showThemes.value = !showThemes.value;

// 定义响应式变量
const birthday = ref<string>('1990-01-01');
const nextBirthday = ref<string>('');
const daysToNextBirthday = ref<number>(0);
const N = ref<string>('7');
const nDaysBeforeNextBirthday = ref<string>('1990-01-01');
const nextPlan = ref<string>('1990-01-01');
// 获取今天日期
const dateToday = ref(getToday());

const fetchData = async () => {
    // 获取出生日期
    dateToday.value = await window.electronAPI.readData('dateToday') || getToday();

    birthday.value = await window.electronAPI.readData('birthday') || '1990-01-01';
    // 根据出生日期和今天日期计算下次生日的日期
    nextBirthday.value = getNextBirthday(birthday.value, dateToday.value);
    // 计算距离下次生日的天数
    daysToNextBirthday.value = getDaysToNextBirthday(nextBirthday.value, dateToday.value);
    // 获取 N 的值
    N.value = await window.electronAPI.readData('N') || '7';
    // 计算距离下次生日前 N 天的日期
    nDaysBeforeNextBirthday.value = getPreviousDay(nextBirthday.value, Number(N.value));
    // 获取下次的计划日期
    nextPlan.value = await window.electronAPI.readData('nextPlan') || nDaysBeforeNextBirthday.value;
};

onMounted(async () => {
    await fetchData();
    window.electronAPI.onDataReceived(fetchData);
});
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

.today-date {
    font-size: 26px;
    font-weight: 700;
    text-align: center;
    margin-bottom: 10px;
    display: flex;
    align-items: center;
    gap: 10px;
    text-shadow: 2px 2px 10px rgba(0, 0, 0, 0.2);
    position: relative;
    top: 15px;
}

.icon {
    width: 28px;
    height: 28px;
    vertical-align: middle;
}

.card {
    display: flex;
    align-items: center;
    gap: 12px;
    width: 100%;
    padding: 15px;
    border-radius: 12px;
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
    transition: all 0.3s ease-in-out;
    font-weight: 600;
}

.card:hover {
    transform: scale(1.05);
    box-shadow: 0 6px 12px rgba(0, 0, 0, 0.2);
}

/* 主题选择按钮 */
.theme-selector {
    position: relative;
    margin-top: 5px;
    display: flex;
    align-items: center;
}

/* 主题按钮 */
.theme-button {
    width: 90px;
    height: 40px;
    border-radius: 8px;
    border: none;
    font-size: 14px;
    font-weight: bold;
    cursor: pointer;
    transition: transform 0.3s ease-in-out;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    position: relative;
    z-index: 2;
}

/* 主题按钮展开动画 */
.theme-button.expanded {
    transform: translateX(-120px);
}

/* 主题选项 */
.theme-options {
    width: 180px;
    height: 35px;
    font-size: 12px;
    font-weight: bold;
    display: flex;
    gap: 10px;
    padding: 10px;
    position: absolute;
    left: 20px;
    top: -5px;
    background: rgba(255, 255, 255, 0.9);
    border-radius: 8px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    transition: opacity 0.3s ease-in-out;
}

/* 主题选项按钮 */
.theme-options button {
    width: 80px;
    height: 35px;
    border-radius: 15px;
    border: none;
    font-size: 12px;
    font-weight: bold;
    cursor: pointer;
    transition: transform 0.3s ease-in-out, background 0.3s ease-in-out;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    background: linear-gradient(45deg, #ff6a00, #ee0979);
    color: white;
}

.theme-options button:hover {
    transform: scale(1.1);
    background: linear-gradient(45deg, #ee0979, #ff6a00);
}
</style>