export type BookItem = {
	id: number;
	title: string;
	status: "reading" | "completed" | "planned";
	rating: number;
	cover: string;
	description: string;
	pages: string;
	year: string;
	genre: string[];
	author: string;
	link: string;
	progress: number;
	totalPages: number;
	startDate: string;
	endDate: string;
};

const localBookList: BookItem[] = [
	{
		id: 1,
		title: "活着",
		status: "completed",
		rating: 9.8,
		cover: "/assets/books/huozhe.webp",
		description: "余华代表作，讲述了福贵一生的悲欢离合",
		pages: "191 pages",
		year: "1993",
		genre: ["Literature", "Fiction"],
		author: "余华",
		link: "https://book.douban.com/subject/4913064/",
		progress: 191,
		totalPages: 191,
		startDate: "2024-01",
		endDate: "2024-02",
	},
	{
		id: 2,
		title: "三体",
		status: "reading",
		rating: 9.5,
		cover: "/assets/books/santi.webp",
		description: "刘慈欣科幻巨作，讲述人类与外星文明的接触",
		pages: "302 pages",
		year: "2008",
		genre: ["Science Fiction", "Space"],
		author: "刘慈欣",
		link: "https://book.douban.com/subject/2567698/",
		progress: 150,
		totalPages: 302,
		startDate: "2024-03",
		endDate: "",
	},
	{
		id: 3,
		title: "百年孤独",
		status: "planned",
		rating: 9.0,
		cover: "/assets/books/bainiangudu.webp",
		description: "加西亚·马尔克斯魔幻现实主义代表作",
		pages: "360 pages",
		year: "1967",
		genre: ["Literature", "Magic Realism"],
		author: "加西亚·马尔克斯",
		link: "https://book.douban.com/subject/6082808/",
		progress: 0,
		totalPages: 360,
		startDate: "",
		endDate: "",
	},
	{
		id: 4,
		title: "围城",
		status: "reading",
		rating: 9.2,
		cover: "/assets/books/weicheng.webp",
		description: "钱钟书代表作，讽刺知识分子的生活",
		pages: "359 pages",
		year: "1947",
		genre: ["Literature", "Satire"],
		author: "钱钟书",
		link: "https://book.douban.com/subject/1008145/",
		progress: 200,
		totalPages: 359,
		startDate: "2024-04",
		endDate: "",
	},
	{
		id: 5,
		title: "红楼梦",
		status: "planned",
		rating: 9.7,
		cover: "/assets/books/hongloumeng.webp",
		description: "曹雪芹古典名著，中国四大名著之一",
		pages: "1200 pages",
		year: "1791",
		genre: ["Classics", "Romance"],
		author: "曹雪芹",
		link: "https://book.douban.com/subject/1007305/",
		progress: 0,
		totalPages: 1200,
		startDate: "",
		endDate: "",
	},
];

export default localBookList;

