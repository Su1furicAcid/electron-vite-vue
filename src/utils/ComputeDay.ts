/**
 * 根据出生日期和今天日期计算下一个生日的日期
 * @param {string} birthday e.g. '1999-01-01'
 * @param {string} today e.g. '2021-01-01'
 * @returns {string} nextBirthday e.g. '2022-01-01'
 */

const getNextBirthday = (birthday: string, today: string): string => {
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
 * 根据下一个生日日期和今天日期计算距离下一个生日的天数
 * @param {string} nextBirthday e.g. '2022-01-01'
 * @param {string} today e.g. '2021-01-01'
 * @returns {number} days e.g. 365
 */

const getDaysToNextBirthday = (nextBirthday: string, today: string): number => {
    const nextBirthdayTimestamp = new Date(nextBirthday).getTime();
    const todayTimestamp = new Date(today).getTime();
    return Math.floor((nextBirthdayTimestamp - todayTimestamp) / (1000 * 60 * 60 * 24));
};

export { getNextBirthday, getDaysToNextBirthday };