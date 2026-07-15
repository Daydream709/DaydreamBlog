import type { ProfileConfig } from "../types/config";

// 个人资料配置
export const profileConfig: ProfileConfig = {
	avatar: "assets/images/avatar.webp", // 头像路径（相对于 /src，以 / 开头则相对于 /public）
	name: "Daydream", // 显示名称
	bio: "Good morning.", // 个人简介
	typewriter: {
		enable: false, // 打字机效果
		speed: 80, // 打字速度（ms）
	},
	links: [
		{
			name: "Bilibili", // 显示名称
			icon: "fa7-brands:bilibili", // Iconify 图标
			url: "https://space.bilibili.com/701864046", // 链接地址
		},
		{
			name: "Gitee",
			icon: "mdi:git",
			url: "https://gitee.com/matsuzakayuki",
		},
		{
			name: "GitHub",
			icon: "fa7-brands:github",
			url: "https://github.com/matsuzaka-yuki",
		},
		{
			name: "Codeberg",
			icon: "simple-icons:codeberg",
			url: "https://codeberg.org",
		},
		{
			name: "Discord",
			icon: "fa7-brands:discord",
			url: "https://discord.gg/MqW6TcQtVM",
		},
	],
};
