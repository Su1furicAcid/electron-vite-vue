# 生日聚会计划便签

## 项目介绍

### 项目概述

生日聚会计划便签是一款基于 Electron + Vite + Vue3 开发的 Windows 桌面应用，辅助用户记录生日聚会计划，并提醒用户进行计划。项目使用 electron-vite-vue 模板进行开发。

### 参考资料

项目的构建基于 electron-vite-vue 模板（参考 https://github.com/electron-vite/electron-vite-vue）；UI 设计使用了 Lucide 图标库（参考 https://lucide.netlify.app/）；数据的持久化存储使用了 electron-store（参考 https://www.npmjs.com/package/electron-store）。

### 支持平台

- Windows

### 功能特性

1. 计算生日倒计时
2. 调整计划时间
3. 计划提醒

### 功能描述

1. 欢迎界面：程序启动时显示欢迎界面，用户按任意键继续。
2. 输入日期：提示用户输入出生日期和今天的日期，计算并显示距离下次生日的天数。
3. 制定计划日期：显示下次生日日期和距离今天的天数，提示用户输入希望提前多少天做聚会计划。根据用户输入的天数，计算并显示计划日期。如果计划日期是工作日，则调整为最近的一个周六。
4. 结果显示：显示生日聚会计划的制定日期信息，包括下次生日日期、距离下次生日的天数、计划日期等。
5. 提醒功能：在计划日期当天，弹出提醒窗口，提醒用户制定生日聚会计划。

## 快速上手

### 本地编译
```sh
# 把项目克隆到本地
git clone https://github.com/electron-vite/electron-vite-vue.git

# 安装依赖
npm install

# 在开发模式下运行
npm run dev

# 编译后打包
npm run build
```

### 直接下载
我们已经准备好了打包后的硬盘版本/无需安装版本，可以直接下载使用。

### 项目结构
```
.
├── dist/                   # 编译后的文件
├── public/                 # 静态资源
├── src/                    # 源代码
│   ├── assets/             # 静态资源
│   ├── components/         # 组件
│   ├── utils/              # 工具函数
│   ├── App.vue             # 根组件，程序入口页面
├── electron/               # electron 相关文件
│   ├── main.js             # electron 主进程
│   ├── preload.js          # electron 预加载脚本
├── package.json            # 项目配置
└── vite.config.js          # vite 配置
```