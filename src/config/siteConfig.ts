import type { SiteConfig } from "../types/config";

// 定义站点语言
const SITE_LANG = "zh_CN"; // 语言代码，例如：'en', 'zh_CN', 'ja' 等。

export const siteConfig: SiteConfig = {
	title: "DaydreamBlog",
	subtitle: "test",
	siteURL: "https://mizuki.mysqil.com/", // 请替换为你的站点URL，以斜杠结尾
	siteStartDate: "2025-01-06", // 站点开始运行日期，用于站点统计组件计算运行天数

	lang: SITE_LANG,

	themeColor: {
		hue: 60, // 主题色的默认色相，范围从 0 到 360。例如：红色：0，青色：200，蓝绿色：250，粉色：345
		fixed: false, // 对访问者隐藏主题色选择器
	},

	featurePages: {
		anime: true,
		book: true,
		diary: true,
		friends: true,
		projects: true,
		skills: true,
		timeline: true,
		albums: true,
		devices: true,
		aiTools: true,
	},

	navbarTitle: {
		mode: "text-icon",
		text: "DaydreamBlog",
		icon: "assets/home/home.png",
		logo: "assets/home/default-logo.png",
	},

	pageScaling: {
		enable: true,
		targetWidth: 2000,
	},

	bangumi: {
		userId: "1200696",
		accessToken: "NUTqsxbMYxCMqxSKROko9LTUo44p7bgRaDAuNJ5m",
		fetchOnDev: true,
	},

	bilibili: {
		vmid: "your-bilibili-vmid",
		fetchOnDev: false,
		coverMirror: "",
		useWebp: true,
	},

	anime: {
		mode: "bangumi",
	},

	book: {
		mode: "bangumi",
	},

	diaryApiUrl: "",

	postListLayout: {
		defaultMode: "list",
		enable: true,
		allowSwitch: true,
		categoryBar: {
			enable: true,
		},
	},

	tagStyle: {
		useNewStyle: false,
	},

	wallpaperMode: {
		defaultMode: "banner",
		showModeSwitchOnMobile: "desktop",
	},

	banner: {
		src: {
			desktop: [
				"/assets/desktop-banner/1.webp",
				"/assets/desktop-banner/2.webp",
				"/assets/desktop-banner/3.webp",
				"/assets/desktop-banner/4.webp",
			],
			mobile: [
				"/assets/mobile-banner/1.webp",
				"/assets/mobile-banner/2.webp",
				"/assets/mobile-banner/3.webp",
				"/assets/mobile-banner/4.webp",
			],
		},
		position: "center",
		carousel: {
			enable: true,
			interval: 3,
			switchable: true,
		},
		waves: {
			enable: true,
			performanceMode: false,
			mobileDisable: false,
			switchable: true,
		},
		imageApi: {
			enable: false,
			url: "http://domain.com/api_v2.php?format=text&count=4",
		},
		homeText: {
			enable: true,
			title: "Title-test",
			switchable: true,
			subtitle: ["test1", "test2", "test3", "test4", "test5"],
			typewriter: {
				enable: true,
				speed: 80,
				deleteSpeed: 40,
				pauseTime: 5000,
			},
		},
		credit: {
			enable: false,
			text: "Describe",
			url: "",
		},
		navbar: {
			transparentMode: "semifull",
		},
	},
	toc: {
		enable: true,
		mobileTop: true,
		desktopSidebar: true,
		floating: true,
		depth: 3,
		useJapaneseBadge: false,
	},
	showCoverInContent: true,
	generateOgImages: false,
	favicon: [],

	showLastModified: true,
	pageProgressBar: {
		enable: true,
		height: 3,
		duration: 6000,
	},

	thirdPartyAnalytics: {
		enable: false,
		clarityId: "",
	},
	card: {
		border: true,
		followTheme: false,
	},
	imageOptimization: {
		formats: "webp",
		quality: 85,
		noReferrerDomains: [
			"*.hdslb.com",
		],
	},
};

export { SITE_LANG };
