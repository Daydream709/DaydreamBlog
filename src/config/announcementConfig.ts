import type { AnnouncementConfig } from "../types/config";

// 公告栏配置
export const announcementConfig: AnnouncementConfig = {
	title: "", // 公告标题，填空使用i18n字符串Key.announcement（中文站显示"公告"）
	content: "本站以学习笔记、番剧漫评和生活记录为主，欢迎随便逛逛～", // 公告内容
	closable: true, // 允许用户关闭公告
	link: {
		enable: true, // 启用链接
		text: "关于本站", // 链接文本
		url: "/about/", // 链接 URL
		external: false, // 内部链接
	},
};
