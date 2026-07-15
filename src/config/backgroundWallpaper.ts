import type { FullscreenWallpaperConfig } from "../types/config";

// 全屏壁纸模式配置（仅在 wallpaperMode.defaultMode="fullscreen" 时生效）
export const fullscreenWallpaperConfig: FullscreenWallpaperConfig = {
	enable: true, // 启用全屏壁纸
	src: {
		desktop: [
			"/assets/desktop-banner/1.webp",
			"/assets/desktop-banner/2.webp",
			"/assets/desktop-banner/3.webp",
			"/assets/desktop-banner/4.webp",
		], // 桌面端壁纸（多张自动轮播）
		mobile: [
			"/assets/mobile-banner/1.webp",
			"/assets/mobile-banner/2.webp",
			"/assets/mobile-banner/3.webp",
			"/assets/mobile-banner/4.webp",
		], // 移动端壁纸
	},
	position: "center", // 图片对齐方式
	carousel: {
		enable: true, // 启用轮播
		interval: 5, // 轮播间隔（秒）
	},
	zIndex: -1, // 层级（确保在背景层）
	opacity: 0.8, // 壁纸透明度（0-1）
	blur: 1, // 背景模糊半径（px）
	switchable: true, // 是否允许用户切换
	overlay: {
		opacity: 0.8,
		blur: 1.5,
		cardOpacity: 0.8, // 卡片不透明度
		switchable: {
			opacity: true,
			blur: true,
			cardOpacity: true,
		},
	},
	fullscreen: {
		switchable: {
			opacity: true,
			blur: true,
		},
	},
};
