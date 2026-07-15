import type { SiteConfig } from "../types/config";

// 站点语言设置
const SITE_LANG = "zh_CN"; // 可选：'en' | 'zh_CN' | 'zh_TW' | 'ja' | 'ko' | 'es' | 'th' | 'vi' | 'tr' | 'id'

export const siteConfig: SiteConfig = {
	title: "DaydreamBlog", // 站点标题
	subtitle: "testsiteconfig", // 站点副标题
	siteURL: "https://mizuki.mysqil.com/", // 站点URL，以斜杠结尾
	siteStartDate: "2026-07-16", // 站点开始运行日期（用于统计运行天数）

	lang: SITE_LANG,

	themeColor: {
		hue: 345, // 主题色色相 0-360（红:0 青:200 蓝紫:250 粉:345）
		fixed: false, // true=隐藏主题色选择器，false=允许访客自定义
	},

	// 特色页面开关（关闭后记得移除导航栏对应链接）
	featurePages: {
		anime: true, // 追番页面
		book: true, // 书籍页面
		diary: true, // 日记页面
		friends: true, // 友链页面
		projects: true, // 项目页面
		skills: false, // 技能页面
		timeline: false, // 时间线页面
		albums: true, // 相册页面
		devices: false, // 设备页面
		aiTools: false, // AI工具页面
	},

	navbarTitle: {
		mode: "text-icon", // 显示模式："text-icon"=图标+文字，"logo"=仅Logo
		text: "DaydreamBlog", // 顶栏标题文本
		icon: "assets/home/home.png", // 标题图标（相对于 /public）
		logo: "assets/home/default-logo.png", // 网站Logo
	},

	pageScaling: {
		enable: true, // 是否启用页面自动缩放
		targetWidth: 2000, // 目标宽度，低于此宽度开始缩放
	},

	bangumi: {
		userId: "1200696", // Bangumi 用户ID
		accessToken: "NUTqsxbMYxCMqxSKROko9LTUo44p7bgRaDAuNJ5m", // Bangumi Access Token（可选，访问隐藏数据）
		fetchOnDev: true, // 开发环境下是否拉取 Bangumi 数据
	},

	bilibili: {
		vmid: "your-bilibili-vmid", // Bilibili 用户UID
		fetchOnDev: false, // 开发环境下是否拉取 Bilibili 数据
		coverMirror: "", // 封面图镜像源（可选）
		useWebp: true, // 是否使用 WebP 格式
	},

	anime: {
		mode: "bangumi", // 番剧模式："bangumi" | "local" | "bilibili"
	},

	book: {
		mode: "bangumi", // 书籍模式："bangumi" | "local"
	},

	diaryApiUrl: "", // 日记 Memos API 地址，留空使用静态数据

	postListLayout: {
		defaultMode: "list", // 默认布局："list"=列表，"grid"=网格
		enable: true, // 是否启用布局切换功能
		allowSwitch: true, // 是否允许用户切换布局
		categoryBar: {
			enable: true, // 文章列表页显示分类导航条
		},
	},

	tagStyle: {
		useNewStyle: false, // 标签样式：false=外框常亮，true=悬停高亮
	},

	wallpaperMode: {
		defaultMode: "banner", // 壁纸模式："banner"|"fullscreen"|"none"
		showModeSwitchOnMobile: "desktop", // 切换按钮显示："off"|"mobile"|"desktop"|"both"
	},

	banner: {
		src: {
			desktop: [
				"/assets/desktop-banner/1.webp",
				"/assets/desktop-banner/2.webp",
				"/assets/desktop-banner/3.webp",
				"/assets/desktop-banner/4.webp",
			], // 桌面端横幅图片（多张自动轮播）
			mobile: [
				"/assets/mobile-banner/1.webp",
				"/assets/mobile-banner/2.webp",
				"/assets/mobile-banner/3.webp",
				"/assets/mobile-banner/4.webp",
			], // 移动端横幅图片
		},
		position: "center", // 图片对齐方式："top"|"center"|"bottom"
		carousel: {
			enable: true, // 启用轮播
			interval: 5, // 轮播间隔（秒）
			switchable: true, // 是否允许用户切换
		},
		waves: {
			enable: true, // 启用水波纹动画（性能开销较大）
			performanceMode: false, // 性能模式（减少复杂度~40%）
			mobileDisable: false, // 移动端禁用
			switchable: true, // 是否允许用户切换
		},
		imageApi: {
			enable: false, // 启用智能图片API（PicFlow）
			url: "http://domain.com/api_v2.php?format=text&count=4",
		},
		homeText: {
			enable: true, // 主页横幅显示自定义文字
			title: "Welcome to Daydream's Blog", // 主标题
			switchable: true, // 是否允许用户切换
			subtitle: ["test1"],
			typewriter: {
				enable: true, // 打字机效果
				speed: 70, // 打字速度（ms）
				deleteSpeed: 40, // 删除速度（ms）
				pauseTime: 5000, // 暂停时间（ms）
			},
		},
		credit: {
			enable: false, // 显示横幅图片来源
			text: "Describe",
			url: "",
		},
		navbar: {
			transparentMode: "semifull", // 导航栏透明："semi"|"full"|"semifull"
		},
	},
	toc: {
		enable: true, // 启用目录
		mobileTop: true, // 手机端顶部目录按钮
		desktopSidebar: true, // 桌面端侧边栏目录
		floating: true, // 悬浮目录按钮
		depth: 3, // 目录深度（1-6）
		useJapaneseBadge: false, // 使用假名序号（あいう…）替代数字
	},
	showCoverInContent: true, // 文章内容页显示封面图
	generateOgImages: false, // 生成 OG 图片（构建耗时较长）
	favicon: [], // favicon 配置，留空使用默认

	showLastModified: true, // 显示"上次编辑"卡片
	pageProgressBar: {
		enable: true, // 页面顶部阅读进度条
		height: 3, // 进度条高度（px）
		duration: 6000, // 动画时长（ms）
	},

	thirdPartyAnalytics: {
		enable: false, // 启用 Microsoft Clarity 统计
		clarityId: "", // Clarity 项目ID
	},
	card: {
		border: true, // 卡片边框和阴影
		followTheme: false, // 卡片背景跟随主题色
	},
	imageOptimization: {
		formats: "webp", // 图片输出格式："avif"|"webp"|"both"
		quality: 85, // 图片质量（1-100）
		noReferrerDomains: [
			"*.hdslb.com", // 需要添加 no-referrer 的域名
		],
	},
};

export { SITE_LANG };
