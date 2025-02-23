/**
 * @abstract 获取今天的日期
 * @returns {string} today e.g. '2021-01-01'
 */
const getToday = ():string => {
    const today = new Date();
    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, '0');
    const day = String(today.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
};

/**
 * @abstract 计算某个日期前 n 天的日期
 * @param {string} date e.g. '2021-01-01'
 * @param {number} days e.g. 1
 * @returns {string} date e.g. '2020-12-31'
 */
const getPreviousDay = (date: string, days: number): string => {
    const inputDate = new Date(date);
    // 使用 setDate 方法调整日期，减去指定的天数
    inputDate.setDate(inputDate.getDate() - days);
    const year = inputDate.getFullYear();
    const month = String(inputDate.getMonth() + 1).padStart(2, '0');
    const day = String(inputDate.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
};

/**
 * @abstract 计算某个日期最相近的周六的日期
 * @param {string} date e.g. '2021-01-01'
 * @returns {string} date e.g. '2021-01-02'
 */
const getNearestSaturday = (date: string): string => {
    const inputDate = new Date(date);
    // 获取星期几（0表示周日）
    const dayOfWeek = inputDate.getDay();

    // 计算距离最近周六的天数
    let daysToSaturday;

    if (dayOfWeek === 1 || dayOfWeek === 2) {
        // 周一-2天，周二-3天
        daysToSaturday = -1-dayOfWeek ; 
    } else if (dayOfWeek === 3 || dayOfWeek === 4 || dayOfWeek === 5) {
        // 周三+3、周四+2，周五+1
        daysToSaturday = 6 - dayOfWeek;  // 例如，周三 (3) -> 3天，周四 (4) -> 2天，周五 (5) -> 1天
    } else {
        // 周六或周日
        daysToSaturday = 0;
    }

    // 调整日期，获取最近的周六
    inputDate.setDate(inputDate.getDate() + daysToSaturday);

    // 返回格式化后的日期
    const year = inputDate.getFullYear();
    const month = String(inputDate.getMonth() + 1).padStart(2, '0');  // 月份从0开始，所以要加1
    const day = String(inputDate.getDate()).padStart(2, '0');  // 保证日期是两位数

    return `${year}-${month}-${day}`;
};

/**
 * @abstract 根据出生日期和今天日期计算下一个生日的日期
 * @param {string} birthday e.g. '1999-01-01'
 * @param {string} today e.g. '2021-01-01'
 * @returns {string} nextBirthday e.g. '2022-01-01'
 */
const getNextBirthday = (birthday: string, today: string): string => {
    console.log(birthday, today);
    const [, month, day] = birthday.split('-').map(Number);
    const [todayYear, todayMonth, todayDay] = today.split('-').map(Number);
    let nextBirthdayYear = todayYear;
    const nextBirthdayMonth = month;
    const nextBirthdayDay = day;
    if (todayMonth > month || (todayMonth === month && todayDay > day)) {
        nextBirthdayYear = todayYear + 1;
    }
    return `${nextBirthdayYear}-${String(nextBirthdayMonth).padStart(2, '0')}-${String(nextBirthdayDay).padStart(2, '0')}`;
};

/**
 * @abstract 根据下一个生日日期和今天日期计算距离下一个生日的天数
 * @param {string} nextBirthday e.g. '2022-01-01'
 * @param {string} today e.g. '2021-01-01'
 * @returns {number} days e.g. 365
 */
const getDaysToNextBirthday = (nextBirthday: string, today: string): number => {
    const nextBirthdayTimestamp = new Date(nextBirthday).getTime();
    const todayTimestamp = new Date(today).getTime();
    return Math.floor((nextBirthdayTimestamp - todayTimestamp) / (1000 * 60 * 60 * 24));
};

export { getNextBirthday, getDaysToNextBirthday, getToday, getPreviousDay, getNearestSaturday };