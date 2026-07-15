import type { LicenseConfig } from "../types/config";

// 文章许可协议配置
export const licenseConfig: LicenseConfig = {
	enable: true, // 是否在文章底部显示许可协议
	name: "CC BY-NC-SA 4.0", // 协议名称
	url: "https://creativecommons.org/licenses/by-nc-sa/4.0/", // 协议链接
};
