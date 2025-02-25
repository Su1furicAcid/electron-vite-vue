/**
 * @description 主题颜色配置文件
 */
export type ThemeType = "elegant" | "energetic" | "calm";

export interface ThemeConfig {
    background: string;
    titleColor: string;
    cardColors: string[];
    textColor: string;
}

export const themes: Record<ThemeType, ThemeConfig> = {
    // 淡雅风格
    elegant: {
        background: "linear-gradient(135deg, #f3e7e9, #e3eeff)",
        titleColor: "#5D5C61",
        cardColors: ["#AFC8AD", "#D4A5A5", "#FFC0CB", "#E6E6FA"],
        textColor: "#333",
    },
    // 活力风格
    energetic: {
        background: "linear-gradient(135deg, #FF6F61, #FFB88C)",
        titleColor: "#ffffff",
        cardColors: ["#FF6F61", "#FFB88C", "#FFD700", "#FF4500"],
        textColor: "#fff",
    },
    // 冷静风格
    calm: {
        background: "linear-gradient(135deg, #2C3E50, #4CA1AF)",
        titleColor: "#E0F7FA",
        cardColors: ["#34495E", "#5D6D7E", "#2E86C1", "#1ABC9C"],
        textColor: "#E0F7FA",
    }
};