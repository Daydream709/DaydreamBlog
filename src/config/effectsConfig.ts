import type { SakuraConfig } from "../types/config";

// 樱花飘落特效配置
export const sakuraConfig: SakuraConfig = {
	enable: false, // 启用樱花特效
	switchable: true, // 允许用户通过设置面板切换
	sakuraNum: 21, // 樱花数量
	limitTimes: -1, // 越界限制次数（-1=无限循环）
	size: {
		min: 0.5, // 最小尺寸倍数
		max: 1.1, // 最大尺寸倍数
	},
	opacity: {
		min: 0.3, // 最小不透明度
		max: 0.9, // 最大不透明度
	},
	speed: {
		horizontal: {
			min: -1.7, // 水平漂移速度最小值
			max: -1.2, // 水平漂移速度最大值
		},
		vertical: {
			min: 1.5, // 下落速度最小值
			max: 2.2, // 下落速度最大值
		},
		rotation: 0.03, // 旋转速度
		fadeSpeed: 0.03, // 消失速度
	},
	zIndex: 100, // 层级
};
