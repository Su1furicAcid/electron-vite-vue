/**
 * @abstract 防抖函数
 * @param func 传入的函数
 * @param wait 等待时间
 * @returns 返回一个函数
 */

const debounce = (func: Function, wait: number) => {
    let timeout: NodeJS.Timeout;
    return function (...args: any) {
        clearTimeout(timeout);
        timeout = setTimeout(() => func(...args), wait);
    };
};

export default debounce;