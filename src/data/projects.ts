// Project data configuration file
// Used to manage data for the project display page

export interface Project {
	id: string;
	title: string;
	description: string;
	image: string;
	category: "web" | "mobile" | "desktop" | "other";
	techStack: string[];
	status: "completed" | "in-progress" | "planned";
	liveDemo?: string;
	sourceCode?: string;
	visitUrl?: string;
	startDate: string;
	endDate?: string;
	featured?: boolean;
	tags?: string[];
	showImage?: boolean;
}

export const projectsData: Project[] = [
	{
		id: "daydreamblog",
		title: "DaydreamBlog",
		description:
			"基于 Mizuki 主题二次开发的个人博客，新增了与番剧页结构一致的书籍页面，以及番剧详情二级页面。",
		image: "/assets/projects/mizuki.webp",
		category: "web",
		techStack: ["Astro", "TypeScript", "Tailwind CSS", "Svelte"],
		status: "in-progress",
		sourceCode: "https://github.com/Daydream709/DaydreamBlog",
		startDate: "2026-07-13",
		featured: true,
		tags: ["博客", "Astro", "二次开发"],
		showImage: false,
	},
	{
		id: "mizuki",
		title: "Mizuki（本站所用主题）",
		description:
			"本站所基于的开源博客主题（上游项目），Material Design 3 风格，支持 i18n、暗色模式与响应式布局。",
		image: "/assets/projects/mizuki.webp",
		category: "web",
		techStack: ["Astro", "TypeScript", "Tailwind CSS", "Svelte"],
		status: "completed",
		sourceCode: "https://github.com/LyraVoid/Mizuki",
		visitUrl: "https://mizuki.mysqil.com",
		startDate: "2024-01-01",
		tags: ["主题", "开源"],
	},
];

// Get project statistics
export const getProjectStats = () => {
	const total = projectsData.length;
	const completed = projectsData.filter((p) => p.status === "completed").length;
	const inProgress = projectsData.filter(
		(p) => p.status === "in-progress",
	).length;
	const planned = projectsData.filter((p) => p.status === "planned").length;

	return {
		total,
		byStatus: {
			completed,
			inProgress,
			planned,
		},
	};
};

// Get projects by category
export const getProjectsByCategory = (category?: string) => {
	if (!category || category === "all") {
		return projectsData;
	}
	return projectsData.filter((p) => p.category === category);
};

// Get featured projects
export const getFeaturedProjects = () => {
	return projectsData.filter((p) => p.featured);
};

// Get all tech stacks
export const getAllTechStack = () => {
	const techSet = new Set<string>();
	projectsData.forEach((project) => {
		project.techStack.forEach((tech) => {
			techSet.add(tech);
		});
	});
	return Array.from(techSet).sort();
};
