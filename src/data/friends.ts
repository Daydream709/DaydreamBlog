// 友情链接数据配置
// 用于管理友情链接页面的数据

export interface FriendItem {
	id: number;
	title: string;
	imgurl: string;
	desc: string;
	siteurl: string;
	tags: string[];
}

// 友情链接数据
// 按下面的格式添加友链即可（id 依次递增，不需要时可保持空数组）：
// {
// 	id: 1,
// 	title: "站点名称",
// 	imgurl: "https://example.com/avatar.png", // 头像地址
// 	desc: "一句话简介",
// 	siteurl: "https://example.com", // 站点地址
// 	tags: ["标签"],
// },
export const friendsData: FriendItem[] = [];

// 获取所有友情链接数据
export function getFriendsList(): FriendItem[] {
	return friendsData;
}

// 获取随机排序的友情链接数据
export function getShuffledFriendsList(): FriendItem[] {
	const shuffled = [...friendsData];
	for (let i = shuffled.length - 1; i > 0; i--) {
		const j = Math.floor(Math.random() * (i + 1));
		[shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
	}
	return shuffled;
}
