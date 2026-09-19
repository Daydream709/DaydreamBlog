# 修改说明

本项目基于 [Mizuki](https://github.com/LyraVoid/Mizuki)（Apache-2.0 协议）进行二次开发，以下记录了相对于上游的主要修改。

## 新增特性

### 书籍页面（Book Page）
- 参照番剧页面的组件模式，重构了书籍列表页
- 新增 `BookCard`、`BookGrid`、`BookFilters` 等组件
- 数据通过 Bangumi API 获取（与番剧数据同源）

### 番剧详情二级页面（Anime Detail Page）
- 新增 `/anime/[id]/` 详情路由
- 展示作品简介、集数、评分、制作公司等信息
- 保留跳转 Bangumi 原站链接

## 配置文件重构

- 上游将单文件 `config.ts` 拆分为模块化配置目录 `src/config/`
- 包含 18 个独立配置文件（站点信息、导航、侧边栏、评论、音乐播放器等）

## Bug 修复

- 修复了 Bangumi 数据拉取脚本（`scripts/update-bangumi.mjs`）中的编码问题
- 修复了代理环境下 Node.js fetch 无法通过 SOCKS5 代理访问 API 的问题
- 修复了番剧卡片点击跳转详情页时 `id` 字段缺失的问题

## 依赖变更

- 新增 `socks-proxy-agent`：用于 SOCKS5 代理环境下的 Bangumi API 数据拉取
- 新增 `undici`：代理支持依赖

## 其他调整

- 修复了上游同步后的 i18n 键缺失问题，补充了番剧详情页和书籍页面所需的翻译
- 补充了配置文件注释，方便后续修改
- 补充了手动图标白名单机制（`astro-icon-include.mjs` 中的 `MANUAL_ICONS`）
- Profile 组件中的外部链接添加了 `data-no-swup` 属性修复点击跳转
